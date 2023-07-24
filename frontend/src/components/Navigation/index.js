import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className='navbar'>

      <li className='logocontainernav'>
        <img className='logopic' src='https://everetsybucket.s3.us-west-1.amazonaws.com/favicon.png'/> &nbsp;&nbsp;
        <NavLink className='logo' exact to="/">airRV</NavLink>
      </li>
      <div className='rightside'>
      <li>{sessionUser ? <NavLink className='navnewspotbutton' exact to="/spots/new" >airRV your home</NavLink> : ''}</li>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
      </div>
    </ul>
  );
}

export default Navigation;
