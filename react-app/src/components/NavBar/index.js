
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import ReactTooltip from "react-tooltip";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            pQuora
          </NavLink>
        </li>
        <li>
          <NavLink to='/home' exact={true} activeClassName='active'>
            <i className="fa-solid fa-house"></i>
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
      <ReactTooltip place="bottom" type="dark" effect="solid" />
    </nav>
  );
}

export default NavBar;
