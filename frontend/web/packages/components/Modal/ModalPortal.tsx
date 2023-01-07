import styled from 'styled-components';
import * as ReactDOM from 'react-dom';
import classnames from 'classnames';
import { useState, useEffect, useRef, useId } from 'react';
import utils from '../utils';
import { ModalContextProvider } from './ModalContext';

const ModalRoot = styled.div<{
  root: boolean;
}>`
  position: ${(props) => (props.root ? 'fixed' : 'absolute')};
  top: 0;
  left: 0;
  bottom: 0;
  z-index: ${(props) => (props.root ? 1100 : 1000)};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(51, 51, 51, 0.5);

  opacity: 0;
  pointer-events: none;
  contain: content;

  &.modal-bg-open {
    transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
    opacity: 1;
    pointer-events: auto;
  }

  &.modal-bg-close {
    transition: opacity 225ms cubic-bezier(1, 0.2, 0, 0.4) 0s;
    opacity: 0;
  }
`;

const ModalRootShadow = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const ModalContainerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export interface ModalPortalProps {
  open: boolean;
  onClose: () => void;
  onCloseAnimationComplete?: () => void;
  // we only allow one child for accessibility (easier to manage focus)
  children: React.ReactChild | boolean | null | undefined; // portal and fragment elements are prohibited
  portalTo?: HTMLElement;
  role?: Extract<React.AriaRole, 'alertdialog' | 'dialog'>;
  style?: React.CSSProperties;
  trapFocus?: boolean;
  focusElement?: Element | null | boolean;
  persist?: boolean;
}

const ModalPortal = ({
  open: o,
  onClose,
  onCloseAnimationComplete,
  children,
  // This is always set by default in any react-app, if this doesn't exist you have bigger problems...
  portalTo = document.getElementById('root')!,
  role = 'dialog',
  style,
  trapFocus = portalTo?.id == 'root' ? true : false,
  // the element to focus on if we close the modal
  focusElement = true,
  persist = false,
}: ModalPortalProps): JSX.Element | null => {
  if (!portalTo) {
    console.warn(
      'No portal element found! If you are trying to test, there must be an element with id=`root`. Otherwise this Modal will not render correctly'
    );
    return null;
  }

  const [open, setOpen] = useState(o);
  const [showing, setShowing] = useState(o);

  let mounted = true;
  useEffect(() => {
    mounted && setOpen(o);
  }, [o]);

  const closeModal = (): void => {
    setOpen(false);
    onClose?.();
  };

  const [scroll, setScroll] = useState<readonly [number, number]>([0, 0]);

  function updateScroll(): void {
    setScroll([portalTo.scrollLeft, portalTo.scrollTop]);
  }

  const bgClassNames = classnames('modal-root', {
    ['modal-bg-open']: persist ? open : showing,
    ['modal-bg-close']: !open,
  });

  // selectively update focusElement
  const [focusElementState, setFocusElementState] = useState(focusElement);

  const refBackground = useRef<HTMLDivElement>(null);
  const refContainer = useRef<HTMLDivElement>(null);

  function escapeEventFunction(ev: KeyboardEvent): void {
    if (ev.key === 'Escape') {
      mounted && closeModal();
    }
  }
  const eventTarget =
    (refBackground.current as unknown as Document) || document;

  function restoreStyle(): void {
    if (portalTo.id === 'root') {
      document.body.classList.remove('modal-scroll-lock');
    } else {
      portalTo.classList.remove('modal-scroll-lock');
    }
  }

  // open/close changes
  useEffect(() => {
    if (open) {
      setShowing(open);
      // focus into dialog
      eventTarget.addEventListener('keydown', escapeEventFunction);
      setFocusElementState(
        document.activeElement ?? document.getElementById('root')!
      );
      try {
        refContainer.current?.focus();
        // @ts-expect-error: child tab-index needs to be -1 for this to work
        refContainer.current?.firstElementChild?.focus();
      } catch (e) {
        // continue
      }

      // disable scrollbar
      if (portalTo.id === 'root') {
        document.body.classList.add('modal-scroll-lock');
      } else {
        portalTo.classList.add('modal-scroll-lock');
      }
    } else {
      // focus back to last selected element
      eventTarget.removeEventListener('keydown', escapeEventFunction);
      try {
        // @ts-expect-error: we catch this error
        focusElement && (focusElement?.focus?.() ?? focusElementState.focus());
      } catch {
        // continue
      }

      // reenable scrollbar
      restoreStyle();
    }

    // only disable sibling tabIndexes if we aren't trapping focus already
    if (!trapFocus) {
      if (open) {
        for (let i = portalTo.childNodes.length - 1; i >= 0; i--) {
          const child = portalTo.childNodes[i] as Element;
          // only disable children elements with uncontrolled tabIndexes
          // otherwise controlled tabIndexes should be done on a case-by-case basis
          // @ts-expect-error: this works
          if (!child.tabIndex && utils.isFocusable(child)) {
            // @ts-expect-error: this works
            child.tabIndex = -5;
          }
        }
      } else {
        for (let i = portalTo.childNodes.length - 1; i >= 0; i--) {
          const child = portalTo.childNodes[i] as Element;
          // @ts-expect-error: this works
          if (child.tabIndex == -5) {
            // @ts-expect-error: this works
            child.tabIndex = undefined;
          }
        }
      }
    }
  }, [open]);

  useEffect(() => {
    if (portalTo.id !== 'root') {
      portalTo.addEventListener('scroll', updateScroll);
    }

    return () => {
      mounted = false;
      eventTarget.removeEventListener('keydown', escapeEventFunction);
      portalTo.removeEventListener('scroll', updateScroll);

      // cleanup style if unexpected unmount
      if (open) {
        restoreStyle();
      }
    };
  }, []);

  // Audit correct usage
  if (portalTo.id !== 'root') {
    const style = window.getComputedStyle(portalTo);
    if (
      !['relative', 'absolute', 'fixed', 'sticky'].includes(
        style.getPropertyValue('position')
      )
    ) {
      console.warn(
        'Your PortalTo value is not validly linked to a positioned parent element. It must have a position that is not static'
      );
    }
  }

  const handleTransitionEnd = (
    e:
      | React.TransitionEvent<HTMLDivElement>
      | React.AnimationEvent<HTMLDivElement>
  ): void => {
    if (!open && e.currentTarget.className.includes('modal-bg-close')) {
      onCloseAnimationComplete?.();
      setShowing(false);
    }
  };

  const ariaLabelledBy = useId();
  const ariaDescribedBy = useId();

  return open || showing || persist
    ? ReactDOM.createPortal(
        <ModalContextProvider
          value={{
            onExit: () => {
              closeModal();
            },
            ariaLabelledBy,
            ariaDescribedBy,
          }}
        >
          <ModalRoot
            className={bgClassNames}
            aria-hidden={!open}
            ref={refBackground}
            tabIndex={-1}
            root={portalTo.id == 'root'}
            style={{
              transform: `translate(${scroll[0]}px,${scroll[1]}px)`,
            }}
            onTransitionEnd={(e) => {
              handleTransitionEnd(e);
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <ModalRootShadow
              onClick={closeModal}
              aria-hidden
              tabIndex={-1}
              className="modal-root-shadow"
            />
            {/**
             * Following W3 Authoring on Dialogs/Modals, surround with two invisible, focusable nodes.
             * Use those to trap a user within the modal.
             */}
            <div
              tabIndex={trapFocus ? 0 : -1}
              onFocus={() => {
                open &&
                  refBackground.current &&
                  utils.focusLastDescendant(refBackground.current);
              }}
            />
            <ModalContainerWrapper
              style={style}
              className={'modal-wrapper'}
              tabIndex={-1}
              ref={refContainer}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {children}
            </ModalContainerWrapper>
            <div
              tabIndex={trapFocus ? 0 : -1}
              onFocus={() => {
                open &&
                  refBackground.current &&
                  utils.focusFirstDescendant(refBackground.current);
              }}
            />
          </ModalRoot>
        </ModalContextProvider>,
        portalTo
      )
    : null;
};

export default ModalPortal;
