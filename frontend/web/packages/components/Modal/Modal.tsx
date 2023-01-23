import React from 'react';
import ModalPortal from './ModalPortal';
import styled, { css } from 'styled-components';
import Button from '../Button';
import T from '../Typography';
import classnames from 'classnames';
import breakpoints from 'packages/style/breakpoints';
import { ButtonProps } from 'packages/components/Button/Button';
import ModalHeading from './ModalHeading';
import { useModal } from './ModalContext';

const ModalFooter = styled.div<{ numberOfButtons?: number }>`
  display: flex;
  justify-content: flex-end;
  flex-flow: row wrap;
  gap: ${({ theme }) => `${theme.spacing.px[100]} ${theme.spacing.px[100]}`};
  margin-top: ${({ theme }) => theme.spacing.px[200]};
  width: 100%;

  :empty {
    display: none;
  }

  & > * {
    display: flex;
    flex: 1 0
      ${({ numberOfButtons = 2, theme }) =>
        `calc(100% / ${numberOfButtons} - ${theme.spacing.px[250]} * ${
          numberOfButtons - 1
        })`};
  }
`;

const ModalFooterComponent = (
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > & { numberOfButtons?: number } & {
    ref?: Parameters<typeof ModalFooter>[0]['ref'];
  }
): JSX.Element => (
  <ModalFooter
    numberOfButtons={React.Children.count(props.children)}
    {...props}
  />
);

/**
 * We need to inset scrollbar 8px on all browsers, not just with ::webkit
 */
const ModalScrollContent = css`
  width: 100%;
  height: 100%;
  margin-right: calc(
    -1 * ${({ theme }) => `${theme.spacing.px[150]} - ${theme.spacing.px[50]}`}
  );
  padding-right: calc(
    ${({ theme }) => `${theme.spacing.px[200]} - ${theme.spacing.px[50]}`}
  );
  scrollbar-gutter: hidden;
  overflow-x: overlay;
  overflow-y: overlay;
  box-sizing: content-box;

  ::-webkit-scrollbar {
    width: ${({ theme }) => theme.spacing.px[50]} !important;
  }

  // Inside elements w/ borders will overflow into scrollbar space if their box-sizing isn't set to border-box
  & > div {
    box-sizing: border-box;
  }
`;

const ModalContainer = styled(T.P2)`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing.px[150]};
  background: ${({ theme }) => theme.color.surface[100]};
  border: 1px solid ${({ theme }) => theme.color.surface[300]};
  color: ${({ theme }) => theme.color.text[400]};
  box-shadow: 0px
    ${({ theme }) => `${theme.spacing.px[50]} ${theme.spacing.px[150]}`}
    rgba(35, 51, 45, 0.16);
  border-radius: ${({ theme }) => theme.spacing.px[25]};
  transition: width 500ms ease-in-out 0s, height 500ms ease-in-out 0s;
  max-height: 100%;
  overflow: visible;

  &.modal-fill {
    width: 100%;
    height: 100%;
  }

  &.modal-small {
    width: min(calc(${({ theme }) => theme.spacing.px[1000]} * 2), 100%);
  }

  &.modal-medium {
    width: min(
      calc(${({ theme }) => theme.spacing.px[1000]} * 2 + 100px),
      100%
    );
  }

  &.modal-large {
    width: min(calc(${({ theme }) => theme.spacing.px(4500)}), 100%);
    & > ${ModalFooter} {
      max-width: calc(
        ${({ theme }) =>
          `${theme.spacing.px(750)}} * 2 + ${theme.spacing.px[150]}`}
      );
      align-self: center;
      // When sufficient screen size is available, this allows the Next Button to grow according to content
      @media (min-width: ${breakpoints.md}) {
        align-self: end;
        white-space: nowrap;
        flex-wrap: nowrap;
      }
    }
  }

  &.modal-auto {
    width: auto;
    & > ${ModalFooter} {
      max-width: calc(
        ${({ theme }) =>
          `${theme.spacing.px(750)}} * 2 + ${theme.spacing.px[150]}`}
      );
      align-self: center;
      // When sufficient screen size is available, this allows the Next Button to grow according to content
      @media (min-width: ${breakpoints.md}) {
        align-self: end;
        white-space: nowrap;
        flex-wrap: nowrap;
      }
    }
  }

  & > p {
    ${ModalScrollContent};
  }
`;

export const ModalContainerComponent = ({
  size,
  className,
  ...rest
}: Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >,
  'ref'
> & {
  size: typeof MODAL_SIZES[keyof typeof MODAL_SIZES];
} & {
  ref?: Parameters<typeof ModalContainer>[0]['ref'];
}): JSX.Element => {
  const cs = classnames(className, 'modal-flat', {
    ['modal-small']: size === MODAL_SIZES.SMALL,
    ['modal-medium']: size === MODAL_SIZES.MEDIUM,
    ['modal-large']: size === MODAL_SIZES.LARGE,
    ['modal-auto']: size === MODAL_SIZES.AUTO,
  });

  return <ModalContainer className={cs} {...rest} as="div" />;
};

const ModalContentStyled = styled.div<{ gap: boolean }>`
  ${ModalScrollContent};
  display: flex;
  flex-flow: column nowrap;
  gap: ${({ gap, theme }) => (gap ? theme.spacing.px[100] : 0)};
  width: 100%;

  & > div:first-child {
    margin-top: 0px;

    & > *:first-child {
      margin-bottom: 0px;
    }
  }
  & > div:last-child {
    margin-bottom: 0px;

    & > *:last-child {
      margin-bottom: 0px;
    }
  }
`;

const ModalContent = ({
  gap = false,
  ...rest
}: Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >,
  'ref' | 'id'
> & { gap?: boolean }): JSX.Element => {
  const { ariaDescribedBy } = useModal();

  return <ModalContentStyled id={ariaDescribedBy} gap={gap} {...rest} />;
};

function createButtonsFromArray(
  a: Array<Parameters<typeof Button>[0]>
): JSX.Element {
  return (
    <ModalFooter numberOfButtons={a.length} className={'modal-footer'}>
      {a.map((e, i): JSX.Element => {
        return <Button key={i} {...e} />;
      })}
    </ModalFooter>
  );
}

function jsxify<T>(
  f: React.ReactNode | ((props: T) => JSX.Element | null),
  rest: T
): React.ReactNode {
  if (typeof f == 'function') {
    return f(rest);
  }
  return f;
}

export type ModalFlatProps<T extends Record<string, any>> = {
  heading?: React.ReactNode;
  footer?:
    | React.ReactChild
    | React.ReactPortal
    | boolean
    | null
    | undefined
    | Array<Parameters<typeof Button>[0]>;
  size?: typeof MODAL_SIZES[keyof typeof MODAL_SIZES];

  styles?: {
    root?: React.CSSProperties;
    content?: React.CSSProperties;
  };

  containerProps?: Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    'ref'
  >;
} & (
  | {
      content?: never;
      children:
        | React.ReactNode
        | ((props: Omit<T, keyof ModalPropsExternal>) => JSX.Element | null);
    }
  | {
      content:
        | React.ReactNode
        | ((props: Omit<T, keyof ModalPropsExternal>) => JSX.Element | null);
      children?: never;
    }
);

export const ModalFlat = <T extends Record<string, any>>({
  heading,
  content,
  children,
  footer,
  styles,
  size = MODAL_SIZES.SMALL,
  containerProps,
  ...rest
}: ModalFlatProps<T>): JSX.Element => {
  const contentMergedChildren =
    children ??
    (typeof content === 'string' || typeof content === 'number' ? (
      <T.P2>{content}</T.P2>
    ) : (
      // @ts-expect-error: This will work fine
      <ModalContent>{jsxify(content, rest)}</ModalContent>
    ));

  const { ariaLabelledBy, ariaDescribedBy } = useModal();

  return (
    <ModalContainerComponent
      style={styles?.root}
      size={size}
      tabIndex={-1}
      aria-modal
      role="dialog"
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      {...containerProps}
    >
      {typeof heading === 'string' ? (
        <ModalHeading>{heading}</ModalHeading>
      ) : (
        heading
      )}
      {typeof contentMergedChildren === 'string' ||
      typeof contentMergedChildren === 'number' ? (
        <T.P2>{contentMergedChildren}</T.P2>
      ) : (
        // @ts-expect-error: This will work fine
        jsxify(contentMergedChildren, rest)
      )}
      {React.isValidElement(footer)
        ? footer
        : Array.isArray(footer)
        ? createButtonsFromArray(footer)
        : false}
    </ModalContainerComponent>
  );
};

export const MODAL_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  AUTO: 'auto',
} as const;

type ModalPropsExternal = {
  open: boolean;
  // this runs when the modal is called to be closed
  onClose: () => void;
  // this runs when the modal is completed closing
  onCloseAnimationComplete?: () => void;
  portalTo?: HTMLElement;
  /**
   * Persist the modal after it is closed, if true it will retain all state data when closed.
   * Defaults to false, each time the modal is opened the state will reset.
   */
  persist?: boolean;
};

export type ModalProps<T extends Record<string, any>> = ModalFlatProps<T> &
  ModalPropsExternal &
  T;

const Modal = <T extends Record<string, any> = Record<string, any>>({
  open: o,
  onClose,
  onCloseAnimationComplete,
  portalTo,
  persist = false,
  ...rest
}: ModalProps<T>): JSX.Element => {
  const [open, setOpen] = React.useState(o);

  let mounted = true;
  React.useEffect(() => {
    mounted && setOpen(o);
    return () => {
      mounted = false;
    };
  }, [o]);

  const closeModal = (): void => {
    setOpen(false);
    onClose?.();
  };

  return (
    <ModalPortal
      open={open}
      onClose={closeModal}
      onCloseAnimationComplete={onCloseAnimationComplete}
      portalTo={portalTo}
      persist={persist}
    >
      {/* @ts-expect-error Inferred type exclusions don't work well with generics. This works fine */}
      <ModalFlat {...rest} />
    </ModalPortal>
  );
};

export interface DefaultFooterProps {
  buttons?: boolean | Exclude<React.ReactNode, string | number>;

  backButton?: boolean;
  backText?: string;
  backButtonProps?: OptionalChildButtonProps;
  onBack?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

  nextButton?: boolean;
  nextText?: string;
  nextButtonProps?: OptionalChildButtonProps;
  onNext?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

  disabled?: boolean;
}

const DefaultFooter = ({
  buttons = true,

  backButton = !!buttons,
  backText = 'CANCEL',
  backButtonProps = {},
  onBack,

  nextButton = !!buttons,
  nextText = 'SAVE',
  nextButtonProps = {},
  onNext,

  disabled = false,
  style,
}: DefaultFooterProps & { style?: React.CSSProperties }): JSX.Element => {
  return (
    <ModalFooter className="modal-footer" style={style}>
      {(backButton || nextButton) &&
        (['object', 'function'].includes(typeof buttons) ? (
          buttons
        ) : (
          <>
            {backButton && (
              <Button
                onClick={onBack}
                hierarchy="secondary"
                {...backButtonProps}
              >
                {backText}
              </Button>
            )}
            {nextButton && (
              <Button onClick={onNext} disabled={disabled} {...nextButtonProps}>
                {nextText}
              </Button>
            )}
          </>
        ))}
    </ModalFooter>
  );
};

export type OptionalChildButtonProps = Omit<ButtonProps, 'onClick' | 'text'> & {
  /** @deprecated Use onBack or onNext instead! */
  onClick?: never;
  /** @deprecated Use backText or nextText instead */
  text?: never;
};

type DefaultModalProps<T extends Record<string, any>> =
  | (Omit<ModalFlatProps<T>, 'footer' | 'children'> &
      ModalPropsExternal &
      DefaultFooterProps & {
        heading: ModalProps<T>['heading'];
      }) &
      (
        | {
            content?: never;
            children: ModalProps<T>['children'];
          }
        | {
            content: ModalProps<T>['content'];
            children?: never;
          }
      );

/**
 * This modal requires a header and footer with 2 buttons with internal state defaulting to close the button.
 */
const DefaultModal = <T extends Record<string, any>>({
  open: o,
  onClose,
  onCloseAnimationComplete,
  buttons = true,
  backButton = !!buttons,
  backText = 'cancel',
  backButtonProps = {},
  onBack,
  nextButton = !!buttons,
  nextText = 'save',
  nextButtonProps = {},
  onNext,
  disabled = false,
  portalTo,
  persist = false,
  ...rest
}: DefaultModalProps<T>): JSX.Element => {
  const [open, setOpen] = React.useState(o);

  let mounted = true;
  React.useEffect(() => {
    mounted && setOpen(o);
    return () => {
      mounted = false;
    };
  }, [o]);

  const closeModal = (): void => {
    setOpen(false);
    onClose?.();
  };

  const footerProps = {
    backButton,
    backText,
    backButtonProps,
    onBack: onBack ?? closeModal,
    nextButton,
    nextText,
    nextButtonProps,
    onNext: onNext ?? closeModal,
    disabled,
  };

  return (
    <ModalPortal
      open={open}
      onClose={closeModal}
      onCloseAnimationComplete={onCloseAnimationComplete}
      portalTo={portalTo}
      persist={persist}
    >
      <ModalFlat {...rest} footer={<DefaultFooter {...footerProps} />} />
    </ModalPortal>
  );
};

export default Object.assign(Modal, {
  Default: DefaultModal,
  Heading: ModalHeading,
  Header: ModalHeading,
  Content: ModalContent,
  Footer: Object.assign(ModalFooterComponent, {
    Default: DefaultFooter,
  }),
  Flat: ModalFlat,
  MODAL_SIZES: MODAL_SIZES,
});
