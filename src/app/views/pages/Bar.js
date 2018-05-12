import React from 'react';

export default function Bar(props) {
  console.log("> Bar : props", props);
  const { query:{ thing }} = props;
  return (
    <div>{thing}</div>
  );
}
