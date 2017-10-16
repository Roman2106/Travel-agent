import React from "react";
import {NavLink} from "react-router-dom";

export const Menu = ({items}) => (
  <nav className="menu">
    <ul className="ulMenu">
      {items.map(({id, title, key}) => (
        <li key={key}>
          <NavLink to={`/${id}`} activeClassName="isActive">{title}</NavLink>
        </li>
      ))}
    </ul>
  </nav>
);