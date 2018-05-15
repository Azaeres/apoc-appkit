import React from 'react';

export default function Bar(props) {
  console.log('> Bar : props', props);
  const { query: { thing } } = props;
  return (
    <div>
      <h1>Loadable Page</h1>
      <div>{thing}</div>
      <div>
        <a href="/#/one">One</a>
      </div>
      <div>
        <a href="/#/two">Two</a>
      </div>
    </div>
  );
}
