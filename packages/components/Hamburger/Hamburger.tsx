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

const HamburgerIconWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  &:hover {
    background-color: ${(props) => props.theme.bg};
    cursor: pointer;
    opacity: 0.5;
  }
`;

const HamburgerIconBottom = styled(HamburgerIconWrapper)`
  margin-top: 10px;
`;

export const HamburgerList = styled(animated.div)`
  width: 100vw;
  max-height: 0px;
  position: absolute;
  overflow: hidden;
  background-color: ${(props) => props.theme.bgDark};
  transition: none;
  @media only screen and (min-width: ${breakpoints.md}) {
    display: none;
  }
`;

export const HamburgerListInner = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LinkHeaderModified = styled(LinkHeader)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

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
  options: { label: string; to: string }[];
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
  const [tid, setTid] = useState<NodeJS.Timeout | number>(0);

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
      console.log(hliRef.current?.clientHeight);
      hamAnimate.start({
        from: { maxHeight: '0px' },
        to: { maxHeight: `${hliRef.current?.clientHeight ?? 512}px` },
        onRest: ({ value }) => {
          if (value.maxHeight === '0px') {
            !hamburgerShow &&
              setTid(
                setTimeout(() => {
                  !hamburgerShow && setHamburgerDisplay(false);
                }, 500)
              );
          }
        },
        config: {
          duration: 150,
        },
        reverse: !hamburgerShow,
      });
    })();
  }, [hamburgerShow]);

  const switchHamburgerVisibility = (): void => {
    clearTimeout(tid);
    !hamburgerShow && setHamburgerDisplay(true);
    setHamburgerShow(!hamburgerShow);
  };

  return (
    <>
      <HamburgerIconWrapper
        onClick={(): void => {
          switchHamburgerVisibility();
        }}
      >
        <MenuIcon />
      </HamburgerIconWrapper>
      {hamburgerDisplay && (
        <HL ref={hlRef} style={hamStyle} {...(rest as any)}>
          <HLI ref={hliRef} {...(rest as any)}>
            {options.map(({ label, to }) => (
              <LinkHeaderModified id={`${label}-${to}`} to={to}>
                {label}
              </LinkHeaderModified>
            ))}
            <HamburgerIconBottom
              onClick={(): void => {
                switchHamburgerVisibility();
              }}
            >
              <CloseIcon />
            </HamburgerIconBottom>
          </HLI>
        </HL>
      )}
    </>
  );
};

export default Hamburger;
