import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../images/header_logo.svg';
import Navigation from '../Navigation/Navigation';

function Header(props) {
  //let logIn = localStorage.getItem('loggedIn');
  const [enableMenu, setEnableMenu] = React.useState(false);

  function openMenu() {
    setEnableMenu(true);
  }

  function closeMenu() {
    setEnableMenu(false);
  }

  return (
    <header className={`Header${props.isAbout ? ' Header_backgroud_blue' : ''}`}>
      <div className="Header__content">
        <Link className="Header__link" to="/"><img className="Header__logo" src={logo} alt="logo"></img></Link>
        {(props.isAbout && !localStorage.getItem('loggedIn')) 
          ? 
            <div className="Header__about">
              {/*<img className="Header__logo" src={logo} alt="logo"></img>*/}
              <Link className="Header__regLink" to="/signup">Регистрация</Link>
              <Link className="Header__logLink" to="/signin">Войти </Link>
            </div>
          :
            <>
              <button type='button' className="Header__button" onClick={openMenu} hidden={enableMenu}></button>
              <div className={`Header__allPage${enableMenu ? ' Header__allPage_visibility_enable' : ''}`}>
                <button type='button' className="Header__closeButton" onClick={closeMenu} hidden={!enableMenu}></button>
                <Navigation />
              </div>
            </>}
          </div>    
    </header>
  );
  }
  
  export default Header;
  