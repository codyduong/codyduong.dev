import { StyledFooterLink } from 'packages/components/Footer/FooterLink';
import { useId, useState } from 'react';
import styled from 'styled-components';
import T from 'packages/components/Typography';
import classNames from 'classnames';
import { LinkProps } from 'react-router-dom';

const FooterExpansion = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
`;

const ElementsWrapper = styled.ul`
  all: unset;
  display: flex;
  flex-flow: column nowrap;
  gap: ${({ theme }) => theme.spacing.px[25]};
  overflow: hidden;

  max-height: 0;
  opacity: 0;
  transition: all 550ms ease-out;
  transition-property: max-height, opacity;
  box-sizing: content-box;

  & > a {
    margin-left: ${({ theme }) => theme.spacing.px[125]};
    margin-right: 2px;
  }

  & > a:first-child {
    margin-top: ${({ theme }) => theme.spacing.px[50]};
  }

  & > a:last-child {
    margin-bottom: ${({ theme }) => theme.spacing.px[75]};
  }

  &.open {
    transition: all 550ms ease-in;
    transition-property: max-height, opacity;
    max-height: 5rem;
    opacity: 1;
  }
`;

const SubLink = styled(StyledFooterLink)`
  ${T.P4.css}
  width: 100%;
  border: unset;
  text-decoration: underline;
`;

type FooterLinkExpansionProps<P, C extends React.FC<P> | undefined> = Omit<
  JSX.IntrinsicElements['div'],
  'ref'
> & {
  title: string;
  elements?:
    | React.ReactNode
    | ({ key: string | number; component?: C } & (C extends undefined
        ? { props: LinkProps & React.RefAttributes<HTMLAnchorElement> }
        : { props?: P }))[];
};

export default function FooterLinkExpansion<
  P = JSX.IntrinsicElements['div'],
  C extends React.FC<P> | undefined = undefined
>({ title, elements, ...rest }: FooterLinkExpansionProps<P, C>): JSX.Element {
  const [open, setOpen] = useState(false);
  const id = useId();
  const elementsWrapperClassnames = classNames({
    ['open']: open,
  });

  const onClickHandler: React.MouseEventHandler<HTMLButtonElement> = (_) => {
    setOpen(!open);
  };

  const elementsComponent = Array.isArray(elements) ? (
    <>
      {elements.map(({ component: C, key, props }) =>
        C ? (
          // @ts-expect-error: key is on every react component
          C({ key, ...props })
        ) : (
          // @ts-expect-error: conditional flow isn't strong enough
          <SubLink key={key} {...(props ?? {})}>
            {/* @ts-expect-error: children can be on react component */}
            {props?.children ?? null}
          </SubLink>
        )
      )}
    </>
  ) : (
    elements
  );

  return (
    <FooterExpansion {...rest}>
      <StyledFooterLink
        as="button"
        aria-haspopup="menu"
        aria-controls={id}
        aria-expanded={open}
        onClick={onClickHandler}
      >
        <span>{title}</span>
        <span aria-hidden>{open ? '-' : '+'}</span>
      </StyledFooterLink>
      <ElementsWrapper
        id={id}
        className={elementsWrapperClassnames}
        tabIndex={open ? undefined : -1}
      >
        {elementsComponent}
      </ElementsWrapper>
    </FooterExpansion>
  );
}
