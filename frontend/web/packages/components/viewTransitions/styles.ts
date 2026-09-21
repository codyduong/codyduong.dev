import { createGlobalStyle } from 'styled-components';

const ViewTransitionStyles = createGlobalStyle`
  /* lg = 992px */
  @media (min-width: 993px) {
    #page-content {
      view-transition-name: page-content;
    }
    header {
      view-transition-name: navbar;
    }
    .nav-underline {
      view-transition-name: nav-underline;
    }
    .banner {
      view-transition-name: banner;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    #page-content,
    header,
    .nav-underline,
    .banner {
      view-transition-name: none;
    }
  }
  html[data-reduce-motion] :is(#page-content, header, .nav-underline, .banner) {
    view-transition-name: none;
  }

  ::view-transition-old(page-content),
  ::view-transition-new(page-content) {
    animation: none;
  }

  ::view-transition-old(root),
  ::view-transition-new(root),
  ::view-transition-old(navbar),
  ::view-transition-new(navbar) {
    animation: none;
  }

  ::view-transition-group(nav-underline) {
    animation-duration: 260ms;
  }

  /* Navbar above the banner */
  ::view-transition-group(navbar) {
    z-index: 2;
  }
  ::view-transition-group(banner) {
    z-index: 1;
  }

  @keyframes vt-banner-drop-in {
    from {
      transform: translateY(-100%);
    }
  }
  @keyframes vt-banner-drop-out {
    to {
      transform: translateY(-100%);
    }
  }
  ::view-transition-new(banner) {
    animation: vt-banner-drop-in 260ms ease both;
  }
  ::view-transition-old(banner) {
    animation: vt-banner-drop-out 260ms ease both;
  }

  @keyframes vt-slide-out-left {
    to {
      transform: translateX(-30px);
      opacity: 0;
    }
  }
  @keyframes vt-slide-in-right {
    from {
      transform: translateX(30px);
      opacity: 0;
    }
  }
  @keyframes vt-slide-out-right {
    to {
      transform: translateX(30px);
      opacity: 0;
    }
  }
  @keyframes vt-slide-in-left {
    from {
      transform: translateX(-30px);
      opacity: 0;
    }
  }

  html[data-vt-nav='forward']::view-transition-old(page-content) {
    animation: vt-slide-out-left 260ms ease both;
  }
  html[data-vt-nav='forward']::view-transition-new(page-content) {
    animation: vt-slide-in-right 260ms ease both;
  }
  html[data-vt-nav='back']::view-transition-old(page-content) {
    animation: vt-slide-out-right 260ms ease both;
  }
  html[data-vt-nav='back']::view-transition-new(page-content) {
    animation: vt-slide-in-left 260ms ease both;
  }
`;

export default ViewTransitionStyles;
