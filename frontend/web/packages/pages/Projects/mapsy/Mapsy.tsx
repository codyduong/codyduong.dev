import T from 'packages/components/Typography';
import Content from 'packages/components/Content';
import Section from 'packages/components/Section';
import { Transition, useTransitionImg } from 'packages/components/TransitionImg';
import styled, { CSSProperties } from 'styled-components';
import { breakpoints } from 'packages/style';
import { useRef, useState, useEffect } from 'react';
import { useScroll } from 'packages/app/contexts/ScrollContext';
import Head from 'packages/components/Head';
import classNames from 'classnames';

const ThumbnailImg = styled.img`
  flex: 1 0 10rem;
  width: 100%;
  height: 20rem;
  @media screen and (min-width: ${breakpoints.lg}) and (max-width: ${breakpoints.xl}) {
    flex: 1 0 12rem;
    height: 12rem;
  }
  @media screen and (min-width: ${breakpoints.xl}) and (max-width: 1369px) {
    flex: 1 0 14rem;
    height: 14rem;
  }
  object-fit: cover;
  &.transitioning {
    opacity: 0;
  }
`;

const Mapsy = (): JSX.Element => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [style, setStyle] = useState<CSSProperties>({ display: 'none' });
  const { top } = useScroll();
  const { transitioning, setTransitioning } = useTransitionImg();
  const [animating, setAnimimating] = useState(transitioning);

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
            objectFit: 'cover',
            zIndex: '-1000000',
          } as const)
        : ({
            display: 'none',
          } as const);
      setStyle(style);
    }
  }, [imgRef, top]);

  useEffect(() => {
    if (!import.meta.env.SSR && animating) {
      const animend = [
        'animationend',
        (event: AnimationEvent) => {
          if (event.pseudoElement === '::view-transition-group(mapsy-image2)') {
            setAnimimating(false);
            setTransitioning(false);
          }
        },
      ] as const;
      document.addEventListener(...animend);
      const t = setTimeout(() => {
        // state mismatch! womp womp fuck you
        setAnimimating(false);
        setTransitioning(false);
      }, 1000);
      window.addEventListener('pageswap', (e) => {
        console.log(e);
      });
      return () => {
        document.removeEventListener(...animend);
        clearTimeout(t);
      };
    }
  }, [animating, setTransitioning]);

  return (
    <>
      <Head title="Mapsy - Projects" />
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
      <Content>
        <Section>
          <ThumbnailImg src={'/mapsy.jpg'} ref={imgRef} className={classNames({ ['transitioning']: animating })} />
          <T.H1>mapsy</T.H1>
        </Section>
      </Content>
    </>
  );
};

export default Mapsy;
