import React from 'react';

export default function Navigation({ routerContext: { path } }) {
  return (
    <div>
      <hr />
      <NavigationItem path="/one" text="One" currentPath={path} />
      <NavigationItem path="/two" text="Two" currentPath={path} />
      <NavigationItem path="/load" text="Load" currentPath={path} />
      <NavigationItem path="/prefetch" text="Prefetch" currentPath={path} />
      <hr />
    </div>
  );
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
