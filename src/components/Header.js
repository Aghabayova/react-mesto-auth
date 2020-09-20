import React from 'react';
import logo from '../images/logo.svg';
import mobileMenu from '../images/menu.svg';
import closeMenu from '../images/close.svg';
import { Link, useLocation } from 'react-router-dom';


function Header({ loggedIn, loggedInEmail, signOut, handleLoginState, menuState, isMobile, onClose}) {
    const { pathname } = useLocation();
    const textPath = `${pathname === '/sign-in' ? 'Регистрация' : 'Войти'}`;
    const linkPath = `${pathname === '/sign-up' ? '/sign-in' : '/sign-up'}`;
    

    return (
        <header className={(isMobile ? "header " : "header")}>
            <img className="logo" src={logo} alt="лого" />
           
            <nav className={(isMobile ? "header__nav active" : "header__nav")}>
                {loggedIn ?
                    <>
                        <p className="header__email">{loggedInEmail}</p>
                        <Link className="header__link header__link_logged" to="/sign-in" onClick={signOut}>Выйти</Link>
                    </>
                    : <Link to={linkPath} className="link header__link" onClick={handleLoginState}>{textPath}</Link>}
            </nav>

            <button className="header__burger" onClick={menuState} onClose={onClose}>
                <img className="header__burger-menu" src={isMobile ? closeMenu : mobileMenu} alt="" />
            </button>
        </header>
    );
}
export default Header;