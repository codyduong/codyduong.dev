import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import T from './Typography';
import { Link } from 'packages/components/A';
import breakpoints from 'packages/style/breakpoints';
import { useScroll } from 'packages/app/contexts/ScrollContext';
import { Transition } from './TransitionImg';

const ProjectLink = styled(Link)`
  height: 20rem;
  border: 1px solid ${({ theme }) => theme.color.surface[300]};
  border-radius: 1rem;
  flex: 1 1 39ch;
  overflow: hidden;
  display: flex;
  flex-flow: column nowrap;
  @media screen and (min-width: ${breakpoints.lg}) and (max-width: ${breakpoints.xl}) {
    height: 22rem;
  }
  @media screen and (min-width: ${breakpoints.xl}) and (max-width: 1369px) {
    height: 24rem;
    flex: 1 0 14rem;
  }
`;

const Thumbnail = styled.figure`
  flex: 1 1 10rem;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  @media screen and (min-width: ${breakpoints.lg}) and (max-width: ${breakpoints.xl}) {
    flex: 1 1 12rem;
  }
  @media screen and (min-width: ${breakpoints.xl}) and (max-width: 1369px) {
    flex: 1 1 14rem;
  }
`;

const ThumbnailImg = styled.img`
  flex: 1 1 10rem;
  height: 10rem;
  @media screen and (min-width: ${breakpoints.lg}) and (max-width: ${breakpoints.xl}) {
    flex: 1 1 12rem;
    height: 12rem;
  }
  @media screen and (min-width: ${breakpoints.xl}) and (max-width: 1369px) {
    flex: 1 1 14rem;
    height: 14rem;
  }
  object-fit: cover;
  /* manually set border radius for transition */
  border-radius: 1rem 1rem 0 0;
`;

const Inset = styled.div`
  flex: 1 0 10rem;
  position: relative;
  padding: 1rem;
  flex-shrink: 1;
  overflow: hidden;
`;

const Desc = styled(T.P3)`
  margin: 1rem 0;
  &::after {
    content: '';
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0), ${({ theme }) => theme.color.surface[100]});
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2rem;
  }
`;

const Admonitions = styled.div`
  padding: 1rem;
`;

interface ProjectProps {
  title: React.ReactNode;
  desc: React.ReactNode;
  badges: React.ReactNode;
  to: string;
  thumbnail?: string;
}

const Project = (props: ProjectProps): React.JSX.Element => {
  const { title, desc, badges, to, thumbnail } = props;
  const imgRef = useRef<HTMLImageElement>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [style, setStyle] = useState<CSSProperties>({ display: 'none' });
  const { top } = useScroll();

  useEffect(() => {
    const img = imgRef.current;
    setImg(img);
    if (img) {
      const rawpos = img?.getBoundingClientRect();
      const fixedpos = {
        top: window.scrollY + (rawpos?.top ?? 0),
        left: window.scrollX + (rawpos?.left ?? 0),
      };
      const style = img
        ? ({
            position: 'absolute',
            top: `${fixedpos.top}px`,
            left: `${fixedpos.left}px`,
            zIndex: '-1000000',
            objectFit: 'cover',
          } as const)
        : ({
            display: 'none',
          } as const);
      setStyle(style);
    }
  }, [imgRef, top]);

  return (
    <ProjectLink to={to} viewTransition={() => {}}>
      {thumbnail && (
        <Thumbnail className={'thumbnail'}>
          <ThumbnailImg src={thumbnail} ref={imgRef} />
          <Transition>
            {img && (
              <img
                aria-hidden
                className="mapsyimage2"
                src="http://localhost:5173/mapsy.jpg"
                style={style}
                width={img?.offsetWidth}
                height={img?.offsetHeight}
              />
            )}
          </Transition>
        </Thumbnail>
      )}
      <Inset>
        <T.H4>{title}</T.H4>
        <Desc>
          {desc}
          {/* <Link.Styled to="/projects" aria-label={`Read more about ${title}`}></Link.Styled> */}
        </Desc>
      </Inset>
      <Admonitions>{badges}</Admonitions>
    </ProjectLink>
  );
};

export default Project;
