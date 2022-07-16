import React, { useEffect, useRef, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import styled, {
  DefaultTheme,
  GetStyledComponentProps,
  StyledComponent,
} from 'styled-components';
import { breakpoints } from 'packages/style';
import { animated, AnimatedComponent, useSpring } from 'react-spring';
import { LinkHeader } from 'packages/components/Link/Link';
import { Button } from 'packages/components/styled/Form';
import _any from 'packages/types/any';
import { useOutsideClick, useOutsideTouch } from 'packages/hooks';

const HamburgerIconWrapper = styled(Button)`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  &:hover {
    background-color: ${(props) => props.theme.secondary.base};
    cursor: pointer;
  }
`;

const HamburgerIconBottom = styled(HamburgerIconWrapper)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const HamburgerList = styled(animated.div)`
  width: 100vw;
  max-height: 0px;
  position: absolute;
  overflow: hidden;
  background-color: ${(props) => props.theme.secondary.d200};
  z-index: 1000;

  transition: max-height none;
  @media only screen and (min-width: ${breakpoints.md}) {
    display: none;
  }
`;

export const HamburgerListInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LinkHeaderModified = styled(LinkHeader)`
  width: 100%;
  text-align: center;
  padding-top: 15px;
  padding-bottom: 15px;
  &:hover {
    transition: background-color 0.5s ease-in-out;
    background-color: ${(props) => props.theme.secondary.base};
  }
`;

interface HamburgerOption {
  label: string;
  value: string | (() => JSX.Element) | null;
}

function OptionMapper(
  options: HamburgerOption[],
  switchHamburgerVisibility: () => void
): React.ReactNode {
  return options.map(({ label, value: V }) => {
    if (label === 'closeIcon' || V === 'closeIcon') {
      return (
        <HamburgerIconBottom
          key={'closeIcon'}
          aria-hidden
          onClick={() => switchHamburgerVisibility()}
        >
          <CloseIcon />
        </HamburgerIconBottom>
      );
    } else if (typeof V === 'string') {
      return (
        <LinkHeaderModified
          id={`hamburger-navigation-${label}`}
          key={`hamburger-navigation-${label}`}
          to={V}
          onClick={() => switchHamburgerVisibility()}
        >
          {label}
        </LinkHeaderModified>
      );
    } else if (
      typeof V === 'function' ||
      (typeof V === 'object' && V !== null)
    ) {
      return <V key={label} />;
    }
    return null;
  });
}

type HamburgerPropsBase = GetStyledComponentProps<typeof HamburgerList>;

type HamburgerProps<
  HamburgerList extends StyledComponent<
    AnimatedComponent<'div'>,
    DefaultTheme,
    HamburgerListProps,
    never
  >,
  HamburgerListProps extends HamburgerPropsBase = GetStyledComponentProps<HamburgerList>
> = {
  hamburgerList: HamburgerList;
  hamburgerListInner?: StyledComponent<
    'div',
    DefaultTheme,
    HamburgerListProps,
    never
  >;
  options: HamburgerOption[];
  fullHeight?: boolean;
} & HamburgerListProps;

const Hamburger = <
  HamburgerList extends StyledComponent<
    AnimatedComponent<'div'>,
    DefaultTheme,
    HamburgerListProps,
    never
  >,
  HamburgerListProps extends HamburgerPropsBase = GetStyledComponentProps<HamburgerList>
>(
  props: HamburgerProps<HamburgerList, HamburgerListProps>
): JSX.Element => {
  const {
    hamburgerList: HL,
    hamburgerListInner: HLI = HamburgerListInner,
    options,
    ...rest
  } = props;

  const hlRef = useRef<HTMLDivElement>(null);
  const hliRef = useRef<HTMLDivElement>(null);
  const [hamburgerDisplay, setHamburgerDisplay] = useState(false);
  const [hamburgerShow, setHamburgerShow] = useState(false);
  const [debounce, setDebounce] = useState(false);

  /**
   * reactSpring value param callback is inconsistent without a second dummy key.
   */
  const [hamStyle, hamAnimate] = useSpring<{ maxHeight: string }>(() => ({
    to: { maxHeight: '0px' },
    config: {
      friction: 10,
    },
  }));

  useEffect(() => {
    (async (): Promise<void> => {
      hamAnimate.start({
        from: { maxHeight: '0px' },
        to: { maxHeight: `${hliRef.current?.clientHeight ?? 220}px` },
        onStart: () => {
          setDebounce(true);
        },
        onRest: ({ value }) => {
          if (value.maxHeight === '0px' && !hamburgerShow) {
            setDebounce(true);
            setTimeout(() => {
              setDebounce(false);
              !hamburgerShow && setHamburgerDisplay(false);
            }, 50);
          } else {
            setDebounce(false);
          }
        },
        config: {
          duration: 150,
        },
        reverse: !hamburgerShow,
      });
    })();
  }, [hamburgerShow]);

  useOutsideClick(hlRef, () => {
    setHamburgerShow(false);
  });

  useOutsideTouch(hlRef, () => {
    setHamburgerShow(false);
  });

  const switchHamburgerVisibility = (): void => {
    if (!debounce) {
      !hamburgerShow && setHamburgerDisplay(true);
      setHamburgerShow(!hamburgerShow);
    }
  };

  return (
    <>
      <HamburgerIconWrapper
        aria-hidden
        tabIndex={-1}
        onClick={(): void => {
          switchHamburgerVisibility();
        }}
      >
        <MenuIcon />
      </HamburgerIconWrapper>
      {hamburgerDisplay && (
        <HL ref={hlRef} style={hamStyle} aria-hidden {...(rest as _any)}>
          <HLI ref={hliRef} {...(rest as _any)}>
            {OptionMapper(options, switchHamburgerVisibility)}
          </HLI>
        </HL>
      )}
    </>
  );
};

export default Hamburger;
