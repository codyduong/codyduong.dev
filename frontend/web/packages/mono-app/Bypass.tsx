import utils from 'packages/components/utils';
import { useBypass } from 'packages/mono-app/BypassContext';
import styled from 'styled-components';

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
`;

/**
 * WCAG 2.4.1
 * A mechanism is available to bypass blocks of content that are repeated on multiple Web pages.
 */
const Bypass = (): JSX.Element | null => {
  const { mainContent } = useBypass();
  const mainContentElement = mainContent?.current;

  if (!mainContentElement) {
    return null;
  }

  const focus = () => {
    try {
      mainContentElement.focus();
      // eslint-disable-next-line no-empty
    } catch {
      utils.attemptFocusOrFirstDescendant(mainContentElement);
    }
  };

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
