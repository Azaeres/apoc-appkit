import React from 'react';
import { compose, withHandlers, pure, withState, lifecycle } from 'recompose';
import screenfull from 'screenfull';

function Navigation({
  routerContext: { path },
  enableFullscreen,
  isFullscreen,
  disableFullscreen
}) {
  return (
    <div>
      <hr />
      <FullscreenButton
        enableFullscreen={enableFullscreen}
        isFullscreen={isFullscreen}
        disableFullscreen={disableFullscreen}
      />
      <br />
      <br />
      <NavigationItem path="/one" text="One" currentPath={path} />
      <NavigationItem path="/two" text="Two" currentPath={path} />
      <NavigationItem path="/load" text="Load" currentPath={path} />
      <NavigationItem path="/prefetch" text="Prefetch" currentPath={path} />
      <NavigationItem path="/iframe" text="iFrame" currentPath={path} />
      <hr />
    </div>
  );
}

function FullscreenButton({
  enableFullscreen,
  isFullscreen,
  disableFullscreen
}) {
  if (screenfull) {
    if (isFullscreen) {
      return (
        <button onClick={disableFullscreen}>Disable Fullscreen Mode</button>
      );
    } else {
      return <button onClick={enableFullscreen}>Enable Fullscreen Mode</button>;
    }
  } else {
    return null;
  }
}

function NavigationItem({ path, text, currentPath }) {
  if (currentPath === path) {
    return <div>{text}</div>;
  } else {
    return (
      <div>
        <a href={`/#${path}`}>{text}</a>
      </div>
    );
  }
}

export default compose(
  withState('isFullscreen', 'setFullscreen', screenfull.isFullscreen),
  withHandlers({
    enableFullscreen: props => event => {
      if (screenfull.enabled) {
        screenfull.request();
      }
    },
    disableFullscreen: props => event => {
      screenfull.exit();
    }
  }),
  lifecycle({
    componentDidMount() {
      if (screenfull) {
        const { setFullscreen } = this.props;
        setFullscreen(screenfull.isFullscreen);
        screenfull.onchange(event => {
          setFullscreen(screenfull.isFullscreen);
        });
      }
    },
    componentWillUnmount() {
      if (screenfull) {
        const { setFullscreen } = this.props;
        setFullscreen(screenfull.isFullscreen);
        screenfull.off('change', event => {
          setFullscreen(screenfull.isFullscreen);
        });
      }
    }
  }),
  pure
)(Navigation);
