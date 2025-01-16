import styled from 'styled-components';
import utils from './components/utils';
import { useScroll } from './app/contexts/ScrollContext';
import { useCallback } from 'react';

const BypassDiv = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  right: 0;
  width: 0;
  height: 0;
  overflow: hidden;
  z-index: 10000;
  justify-content: center;

  &:focus-within {
    overflow: visible;
    height: auto;
    width: auto;
  }

  & > a {
    background-color: ${({ theme }) => theme.color.surface[100]};
    width: 0;
    height: 0;
    overflow: hidden;

    &:focus {
      padding: ${({ theme }) => theme.spacing.px[50]};
      width: auto;
      height: auto;
      text-decoration: underline;
    }
  }

  .no-main {
    display: hidden;
  }
`;

/**
 * WCAG 2.4.1
 * A mechanism is available to bypass blocks of content that are repeated on multiple Web pages.
 */
const Bypass = (): JSX.Element | null => {
  const { pageRef: mainContent } = useScroll();

  const focus = useCallback(() => {
    const mainContentElement = mainContent?.current;
    if (!mainContentElement) {
      return null;
    }

    try {
      mainContentElement.focus();
    } catch {
      utils.attemptFocusOrFirstDescendant(mainContentElement);
    }
  }, [mainContent]);

  return (
    <BypassDiv>
      <a
        role="link"
        tabIndex={0}
        onClick={() => {
          focus();
        }}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            focus();
          }
        }}
      >
        Skip to main content
      </a>
    </BypassDiv>
  );
};

export default Bypass;
