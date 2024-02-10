import { Outlet } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import { useState, useEffect } from 'react';

const Layout = () => {
    const location = useLocation();
    const [homeClass, setHomeClass] = useState('current-link');
    const [aboutClass, setAboutClass] = useState('');

    useEffect(() => {
        const currentPath = location.pathname;
        switch (currentPath) {
            case '/':
                setHomeClass('current-link');
                setAboutClass('');
                break;
            case '/about':
                setHomeClass('');
                setAboutClass('current-link');
                break;
            default:
                setHomeClass('current-link');
                setAboutClass('');
        }

    }, [location.pathname]);

    return <body>
        <div class="page-container">
            <header>
            <p id="left">Signature Forgery Detection</p>
            <div id="right">
                <Link to={"/"} className={homeClass}>Home</Link>
                <Link to={"/about"} className={aboutClass}>About</Link>
            </div>
            </header>
            <Outlet />
            <footer>
            <div class="img-container">
                <img src="TMI.png" alt='TMI logo'/>
            </div>
            <p>Made with love by Angela, Evelyn, Dian and co. with Trustworthy Machine Intelligence</p>
            </footer>
        </div>
    </body>
}

export default Layout;