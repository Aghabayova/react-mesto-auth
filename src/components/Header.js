import React from 'react';
import logo from '../images/logo.svg';
import openIcon from '../images/menu.svg';
import closeIcon from '../images/close.svg';
import { Link, useLocation } from 'react-router-dom';


function Header({ loggedIn, loggedInEmail, signOut, handleLoginState, isMobile, onMenuClick }) {
    const { pathname } = useLocation();
    const textPath = `${pathname === '/sign-in' ? 'Регистрация' : 'Войти'}`;
    const linkPath = `${pathname === '/sign-up' ? '/sign-in' : '/sign-up'}`;


    return (
        <header className='header'>
            <img className="logo" src={logo} alt="лого" />
            {loggedIn ?
                (<button className="header__burger" onClick={onMenuClick} >
                    <img className="header__burger-menu" src={isMobile ? closeIcon : openIcon} alt="" />
                </button>) :
                (<nav className="header__nav">
                    {loggedIn ?
                        <>
                            <p className="header__email">{loggedInEmail}</p>
                            <Link className="header__link" to="/sign-in" onClick={signOut}>Выйти</Link>
                        </>
                        : <Link to={linkPath} className="header__link" onClick={handleLoginState}>{textPath}</Link>}
                </nav>)}
        </header>
    );
}
export default Header;