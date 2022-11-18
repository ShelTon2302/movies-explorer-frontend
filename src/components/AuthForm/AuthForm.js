import './AuthForm.css';
import logo from '../../images/header_logo.svg';
import { Link } from 'react-router-dom';

function AuthForm(props) {
    return (
        <section className="AuthForm">
            <Link  to="/"><img className="AuthForm__logo" src={logo} alt='logo' /></Link>
            <h2 className="AuthForm__title">{props.title}</h2>
            <form className='AuthForm__form'>
                <div className="AuthForm__inputsArea">
                    {props.children}
                    <p className="AuthForm__inputName">E-mail</p>
                    <input 
                        type="text" 
                        defaultValue="pochta@yandex.ru" 
                        className="AuthForm__input" 
                        required 
                    />
                    <p className="AuthForm__inputName">Пароль</p>
                    <input 
                        type="password" 
                        defaultValue="pochta@yandex.ru" 
                        className="AuthForm__input" 
                        required 
                    />
                </div>
                <button type="submit" className="AuthForm__submit" aria-label="Ещё">{props.buttonText}</button>
            </form>
            <div className="AuthForm__textArea">
                <p className="AuthForm__text">{props.text}</p>
                <Link className="AuthForm__link" to={props.link}>{props.linkText}</Link>
            </div>
        </section>
    );
};

export default AuthForm;