import React from 'react';
import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header({ loggedIn, email, onLogOut, loginState, handleLoginState }) {
    return (
        <header className="header">
            <img className="logo" src={logo} alt="лого" />
            <nav className='header__nav'>
                {loggedIn ?
                    <>
                        <p className="header__email">{email}</p>
                        <Link className="header__link header__link_logged" to="/sign-in" onClick={onLogOut}>Выйти</Link>
                    </>
                    : <Link className="header__link" to={loginState ? "/sign-up" : "/sign-in"} onClick={handleLoginState}>
                        {loginState ? "Регистрация" : "Войти"}
                    </Link>}
            </nav>
        </header>
    );
}
export default Header;