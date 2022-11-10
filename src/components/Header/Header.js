import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import logo from '../../images/header_logo.svg'

function Header(props) {
    return (
      <header className={`Header${props.isAbout ? ' Header_backgroud_blue' : ''}`}>
        <img className="Header__logo" src={logo} alt="logo"></img>
        {props.isAbout 
          ? 
            <>
              <Link className="Header__regLink" to="/signup">Регистрация</Link>
              <Link className="Header__logLink" to="/signin">Войти </Link>
            </>
          :
            <>
              <nav className="Header__menu">
                <NavLink to="/movies" activeClassName="Header__menuLink_active" className="Header__menuLink">Фильмы</NavLink>
                <NavLink to="/saved-movies" activeClassName="Header__menuLink_active" className="Header__menuLink">Сохраненные фильмы</NavLink>
              </nav>
              <div className="Header__profileGroup">
                <p className="Header__profileText">Аккаунт</p>
                <button type="button" className="Header__profileLogo" aria-label="Profile"></button>
              </div>
            </>}
      </header>
    );
  }
  
  export default Header;
  