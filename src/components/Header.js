import React from 'react';
import logo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header({ loggedIn, loggedInEmail, signOut, loginState, handleLoginState }) {
    const { pathname } = useLocation();
    const linkText = `${pathname === '/sign-in' ? 'Регистрация' : 'Войти'}`;
    const linkPath = `${pathname === '/sign-up' ? '/sign-in' : '/sign-up'}`;
    const Email = `${loggedIn === true ? loggedInEmail : ''}`;
   

    return (
        <header className="header">
            <img className="logo" src={logo} alt="лого" />
            <nav className='header__nav'>
                {loggedIn ?
                    <>
                        <p className="header__email">{Email}</p>
                        <Link className="header__link header__link_logged" to="/sign-up" onClick={signOut}>Выйти</Link>
                    </>
                    : <Link to={linkPath} className="link header__link" onClick={handleLoginState}>{linkText}</Link>}
            </nav>
        </header>
    );
}
export default Header;