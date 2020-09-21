import React from 'react';
import { Link, useLocation } from 'react-router-dom';



function MobileMenu({ loggedInEmail, signOut, mobileState, loggedIn, handleLoginState, isMobile }) {

    const { pathname } = useLocation();
    const textPath = `${pathname === '/sign-in' ? 'Регистрация' : 'Войти'}`;
    const linkPath = `${pathname === '/sign-up' ? '/sign-in' : '/sign-up'}`;

    let mobileMenuClass = "mobile_inactive";

    if (loggedIn === true) {
        mobileMenuClass = `${isMobile ? "mobile" : "mobile_inactive"}`;
    }
    else {
        mobileMenuClass = "mobile_inactive";
    }


    return (
        <div className={mobileMenuClass} >
            <nav className="mobile__nav">
                {loggedIn ?
                    <>
                        <p className="mobile__email">{loggedInEmail}</p>
                        <Link className="mobile__link" to="/sign-in" onClick={signOut}>Выйти</Link>
                    </>
                    : <Link to={linkPath} className="mobile__link" onClick={handleLoginState}>{textPath}</Link>}
            </nav>
        </div>
    );
}
export default MobileMenu;