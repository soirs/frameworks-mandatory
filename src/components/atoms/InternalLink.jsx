import React from 'react';

const InternalLink = props => (
  <a {...props} href={props.to} rel="noopener noreferrer">
    {props.children}
  </a>
);

export default InternalLink;
