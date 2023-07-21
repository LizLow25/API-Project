import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom'
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './ProfileButton.css'

function ProfileButton() {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeMenu();
        history.push('/')
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>

            <button onClick={openMenu} className="navbutton">
                <i className="fa-solid fa-bars fa-2x"></i>
                <i className="fas fa-user-circle fa-2x" />
            </button>

            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <>

                        <div className="userdropcontainer">
                            <div className="toppart">
                                <li>{`Hello, ${user.firstName}`}</li>
                                <li>{user.email}</li>
                            </div>
                            <li className="managespots">
                                <NavLink className="managespots" exact to='/spots/current'>Manage Spots</NavLink>
                            </li>
                            <li className="managespots">
                                <NavLink className="managespots" exact to='/bookings'>Trips</NavLink>
                            </li>
                            <li>
                                <button
                                    className="userlogoutbutton"
                                    onClick={logout}>Log Out</button>
                            </li>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="userdropcontainer">
                            <OpenModalMenuItem
                                itemText="Log In"
                                onItemClick={closeMenu}
                                modalComponent={<LoginFormModal />}
                            />
                            <OpenModalMenuItem
                                itemText="Sign Up"
                                onItemClick={closeMenu}
                                modalComponent={<SignupFormModal />}
                            />
                        </div>
                    </>
                )}
            </ul>
        </>
    );
}

export default ProfileButton;
