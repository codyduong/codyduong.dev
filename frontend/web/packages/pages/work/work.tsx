import styled, { css } from 'styled-components';
import { Typography as T } from 'packages/components/Typography';
import { Link, Route, Routes } from 'react-router-dom';
import loadable from 'packages/components/SpinkitLoadable';
import classNames from 'classnames';
import { useState } from 'react';

const AGI = loadable(() => import('./agi/index'));
const NotFound = loadable(() => import('packages/pages/404/NotFound'));

const Section = styled.section`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  transition: all 750ms;

  &.hovering-agi {
    box-shadow: inset 100vw 0 0 0 #006b36;
  }
`;

const transitionColor = css`
  transition: color 750ms;
  &.fulldark {
    color: ${({ theme }) => theme.color.text[600]};
  }
`;

const WorkplaceDate = styled(T.Span2)`
  ${transitionColor}
`;

const WorkplaceTitle = styled.h2`
  all: unset;
  display: block;
  ${T.Heading.H1.css}
  ${transitionColor}
`;

const WorkplacePosition = styled(T.Span2.italic)`
  ${transitionColor}
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.rem[400]};
`;

const liShared = css`
  display: block;
  text-transform: lowercase;
`;

const Li = styled.li`
  ${liShared}

  &.disabled {
    cursor: not-allowed;
  }
`;

const StyledLink = styled(Link)`
  cursor: pointer;

  &.disabled {
    pointer-events: none;
  }
`;

interface WorkProps {
  to: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLAnchorElement>;
  disabled?: boolean;
  textClassname?: string;
  workplaceTitle: string;
  position: string;
  dateString: string;
}

const Workplace = ({
  to,
  onClick,
  onMouseEnter,
  onMouseLeave,
  disabled,
  textClassname: tC,
  workplaceTitle,
  position,
  dateString,
}: WorkProps): JSX.Element => {
  const liClassnames = classNames({
    ['disabled']: disabled,
  });
  const linkClassnames = classNames('work-link', {
    ['disabled']: disabled,
  });

  return (
    <Li className={liClassnames}>
      <StyledLink
        className={linkClassnames}
        to={to}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <WorkplaceDate className={tC}>{dateString}</WorkplaceDate>
        <WorkplaceTitle className={tC}>{workplaceTitle}</WorkplaceTitle>
        <WorkplacePosition className={tC}>{position}</WorkplacePosition>
      </StyledLink>
    </Li>
  );
};

const Work = (): JSX.Element => {
  const [hovering, setHovering] = useState<null | 'agi' | 'other'>(null);

  const workSectionClassnames = classNames('work-section', {
    ['hovering-agi']: hovering == 'agi',
  });
  const agiTextClassname = classNames({
    ['light']: hovering == 'agi',
    ['fulldark']: hovering && hovering != 'agi',
  });
  const otherTextClassname = classNames({
    ['fulldark']: hovering && hovering != 'other',
  });

  return (
    <Routes>
      <Route path="/agi/" element={<AGI />} />
      <Route
        path="/"
        element={
          <Section className={workSectionClassnames}>
            <Ul>
              <Workplace
                to={'/work/agi/'}
                onClick={() => setHovering(null)}
                onMouseEnter={() => setHovering('agi')}
                onMouseLeave={() =>
                  setHovering((prevstate) =>
                    prevstate == 'agi' ? null : prevstate
                  )
                }
                dateString={'June 2021 - Present'}
                workplaceTitle={'AGI Suretrack/Digital'}
                position={'Software Engineering Intern'}
                textClassname={agiTextClassname}
              />
              <Workplace
                to={'/work/other/'}
                dateString={'Always Ongoing'}
                workplaceTitle={'Other Projects'}
                position={'Enthusiast'}
                textClassname={otherTextClassname}
                disabled
              />
            </Ul>
          </Section>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Work;
