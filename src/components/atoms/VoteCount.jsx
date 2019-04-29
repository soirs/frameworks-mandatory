import React from 'react';

const VoteCount = (props) => {
  return (
      <span className="uk-badge">{props.children}</span>
  );
};

export default VoteCount;
