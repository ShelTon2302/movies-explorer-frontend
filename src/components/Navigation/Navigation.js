import './Navigation.css';
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../../images/header_profilelogo.svg';

function Navigation() {
    return (
        <div className="Navigation">
            <nav className="Navigation__menu">
                <NavLink exact to="/" activeClassName="Navigation__menuLink_active" className="Navigation__menuLink">Главная</NavLink>
                <NavLink to="/movies" activeClassName="Navigation__menuLink_active" className="Navigation__menuLink">Фильмы</NavLink>
                <NavLink to="/saved-movies" activeClassName="Navigation__menuLink_active" className="Navigation__menuLink">Сохраненные фильмы</NavLink>
                <NavLink to="/profile" activeClassName="Navigation__menuLink_active" className="Navigation__menuLink">Аккаунт</NavLink>
                <NavLink to="/profile" className="Navigation__menuLink"><img className="Navigation__profileLogo" src={logo} alt="logo"></img></NavLink>
            </nav>
            {/*<Link className="Navigation__profileLink" to="/profile"><img className="Navigation__profileLogo" src={logo} alt="logo"></img></Link>*/}
        </div>
    );
};

export default Navigation;