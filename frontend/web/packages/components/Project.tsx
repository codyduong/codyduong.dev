/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import T from './Typography';
import { Link } from 'packages/components/A';
import breakpoints from 'packages/style/breakpoints';
import { useScroll } from 'packages/app/contexts/ScrollContext';
import { Transition } from './TransitionImg';

const ProjectLink = styled(Link)`
  position: relative;
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
    background: linear-gradient(to right, rgba(255, 255, 255, 0), ${({ theme }) => theme.color.surface[100]});
    @media screen and (max-width: ${breakpoints.lg}) {
      background: linear-gradient(to right, rgba(255, 255, 255, 0), ${({ theme }) => theme.color.surface[100]}),
        linear-gradient(to bottom, rgba(255, 255, 255, 0), ${({ theme }) => theme.color.surface[100]});
    }
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2rem;
  }
`;

const Badges = styled.div`
  padding: 1rem;
`;

const Banner = styled.span`
  ${T.H4.css}
  color: #fff;
  position: absolute;
  padding: 0.5rem 2rem;
  text-align: center;
  transform-origin: center;
  /* transform: rotate(-45deg); */
  background-color: ${({ theme }) => theme.color.base[400]};
  box-shadow: 0px 1px 4px ${({ theme }) => theme.color.surface[400]};
  border-radius: 0 0 1rem 0;
`;

interface ProjectProps {
  title: React.ReactNode;
  desc: React.ReactNode;
  badges: React.ReactNode;
  to: string;
  thumbnail?: string;
  bannerText?: React.ReactNode;
  alt?: string;
}

const Project = (props: ProjectProps): React.JSX.Element => {
  const { title, desc, badges, to, thumbnail, bannerText, alt } = props;
  const imgRef = useRef<HTMLImageElement>(null);
  // const [img, setImg] = useState<HTMLImageElement | null>(null);
  // const [style, setStyle] = useState<CSSProperties>({ display: 'none' });
  const { top } = useScroll();

  useEffect(() => {
    const img = imgRef.current;
    // setImg(img);
    if (img) {
      // const rawpos = img?.getBoundingClientRect();
      // const fixedpos = {
      //   top: window.scrollY + (rawpos?.top ?? 0),
      //   left: window.scrollX + (rawpos?.left ?? 0),
      // };
      // const style = img
      //   ? ({
      //       position: 'absolute',
      //       top: `${fixedpos.top}px`,
      //       left: `${fixedpos.left}px`,
      //       zIndex: '-1000000',
      //       objectFit: 'cover',
      //     } as const)
      //   : ({
      //       display: 'none',
      //     } as const);
      // setStyle(style);
    }
  }, [imgRef, top]);

  return (
    <ProjectLink to={to} viewTransition={() => {}}>
      {bannerText && <Banner>{bannerText}</Banner>}
      {thumbnail && (
        <Thumbnail className={'thumbnail'}>
          <ThumbnailImg src={thumbnail} ref={imgRef} alt={alt} />
        </Thumbnail>
      )}
      <Inset>
        <T.H4>{title}</T.H4>
        <Desc>
          {desc}
          {/* <Link.Styled to="/projects" aria-label={`Read more about ${title}`}></Link.Styled> */}
        </Desc>
      </Inset>
      <Badges>{badges}</Badges>
    </ProjectLink>
  );
};

export default Project;
