import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import logo from '../../images/header_logo.svg'

function Header(props) {
    return (
      <header className={`Header${props.isAbout ? ' Header_backgroud_blue' : ''}`}>
        {props.isAbout 
          ? 
            <div className="Header__content">
              <img className="Header__logo" src={logo} alt="logo"></img>
              <Link className="Header__regLink" to="/signup">Регистрация</Link>
              <Link className="Header__logLink" to="/signin">Войти </Link>
            </div>
          :
            <div className="Header__content">
              <Link to="/"><img className="Header__logo" src={logo} alt="logo"></img></Link>
              <nav className="Header__menu">
                <NavLink to="/movies" activeClassName="Header__menuLink_active" className="Header__menuLink">Фильмы</NavLink>
                <NavLink to="/saved-movies" activeClassName="Header__menuLink_active" className="Header__menuLink">Сохраненные фильмы</NavLink>
              </nav>
              <div className="Header__profileGroup">
                <p className="Header__profileText">Аккаунт</p>
                <Link className="Header__profileLogo" to="/profile"></Link>
              </div>
            </div>}
      </header>
    );
  }
  
  export default Header;
  