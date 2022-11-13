import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import logo from '../../images/header_logo.svg';
import Navigation from '../Navigation/Navigation';

function Header(props) {
  const [enableMenu, setEnableMenu] = React.useState(false);

  function openMenu() {
    setEnableMenu(true);
  }

  function closeMenu() {
    setEnableMenu(false);
  }

  return (
    <header className={`Header${props.isAbout ? ' Header_backgroud_blue' : ''}`}>
      <Link className="Header__link" to="/"><img className="Header__logo" src={logo} alt="logo"></img></Link>
      {props.isAbout 
        ? 
          <div className="Header__aboutContent">
            {/*<img className="Header__logo" src={logo} alt="logo"></img>*/}
            <Link className="Header__regLink" to="/signup">Регистрация</Link>
            <Link className="Header__logLink" to="/signin">Войти </Link>
          </div>
        :
          <>
            <button type='button' className="Header__button" onClick={openMenu} hidden={enableMenu}></button>
            <div className={`Header__content${enableMenu ? ' Header__content_visibility_enable' : ''}`}>
              <button type='button' className="Header__closeButton" onClick={closeMenu} hidden={!enableMenu}></button>

              <Navigation />

              {/*<Link to="/"><img className="Header__logo" src={logo} alt="logo"></img></Link>
              <nav className="Header__menu">
                <NavLink to="/movies" activeClassName="Header__menuLink_active" className="Header__menuLink">Фильмы</NavLink>
                <NavLink to="/saved-movies" activeClassName="Header__menuLink_active" className="Header__menuLink">Сохраненные фильмы</NavLink>
              </nav>
              <div className="Header__profileGroup">
                <p className="Header__profileText">Аккаунт</p>
                <Link className="Header__profileLogo" to="/profile"></Link>
              </div>*/}
            </div>
          </>}    
    </header>
  );
  }
  
  export default Header;
  