import './Header.css';
import logo from '../../images/header_logo.svg'

function Header(props) {
    return (
      <header className="Header">
        <img className="Header__logo" src={logo} alt="logo"></img>
        {props.children}
      </header>
    );
  }
  
  export default Header;
  