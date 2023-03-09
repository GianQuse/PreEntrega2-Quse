import React from 'react';
import CartWidget from './CartWidget';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar container-page">
            <h1>
                <Link to="/">
                    <img className='logoNav' src="https://www.zarla.com/images/zarla-caballeros-1x1-2400x2400-20220322-bh6yhpdpxr898d7qx8my.png?crop=1:1,smart&width=250&dpr=2" alt="Logo" />
                </Link>
            </h1>
            <ul>
                <li>
                    <NavLink to="/categoria/remeras">Remeras</NavLink>
                </li>
                <li>
                    <NavLink to="/categoria/camisas">Camisas</NavLink>
                </li>
            </ul>
            <Link to="/cart">
                <CartWidget />
            </Link>
        </nav>
    );
};

export default Navbar;
