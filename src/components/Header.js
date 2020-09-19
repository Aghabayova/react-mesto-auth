import React from 'react';
import logo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header({ loggedIn, loggedInEmail, signOut, handleLoginState }) {
    const { pathname } = useLocation();
    const textPath = `${pathname === '/sign-in' ? 'Регистрация' : 'Войти'}`;
    const linkPath = `${pathname === '/sign-up' ? '/sign-in' : '/sign-up'}`;


    return (
        <header className="header">
            <img className="logo" src={logo} alt="лого" />
            <nav className='header__nav'>
                {loggedIn ?
                    <>
                        <p className="header__email">{loggedInEmail}</p>
                        <Link className="header__link header__link_logged" to="/sign-in" onClick={signOut}>Выйти</Link>
                    </>
                    : <Link to={linkPath} className="link header__link" onClick={handleLoginState}>{textPath}</Link>}
            </nav>
        </header>
    );
}
export default Header;