import React from 'react';
import { Link } from 'react-router';
import './MenuItem.css';

const MenuItem = (props) => {
  return (
    <li className="MenuItem">
      {
        (props.href)
        ? <a href={props.href} target="_blank">{props.children}</a>
        : <Link onClick={props.handleClick} to={props.to} activeClassName="active">{props.children}</Link>
      }
    </li>
  )
}

export default MenuItem;
