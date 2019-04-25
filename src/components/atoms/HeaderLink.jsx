import React from 'react';
import { Link } from 'react-router-dom';

const HeaderLink = props => (
  <li className={props.liClass}>
    <Link className={props.linkClass} to={props.to}>
      <span data-uk-icon={props.icon} className="uk-icon" />
      {props.children}
    </Link>
  </li>
);

export default HeaderLink;
