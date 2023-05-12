import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className='navbar'>
      <li>
        <NavLink className='logo' exact to="/">airRV</NavLink>
      </li>
      <li>{sessionUser ? <NavLink exact to="/spots/new"><button> Create a New Spot </button> </NavLink> : ''}</li>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
