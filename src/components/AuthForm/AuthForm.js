import './AuthForm.css';
import logo from '../../images/header_logo.svg';
import { Link } from 'react-router-dom';

function AuthForm(props) {
    
    return (
        <section className="AuthForm">
            <Link  to="/"><img className="AuthForm__logo" src={logo} alt='logo' /></Link>
            <h2 className="AuthForm__title">{props.title}</h2>
            <form className='AuthForm__form' name='Auth' onSubmit={props.onSubmit}>
                <div className="AuthForm__inputsArea">
                    {props.children}
                    <p className="AuthForm__inputName">E-mail</p>
                    <input 
                        type='email' 
                        placeholder='pochta@yandex.ru'
                        className='AuthForm__input AuthForm__input_email'
                        name='auth_email'
                        value={props.email}
                        onChange={props.handleChangeEmail}
                        required 
                    />
                    <span className="AuthForm__input-error">{props.emailErr}</span>
                    <p className="AuthForm__inputName">Пароль</p>
                    <input 
                        type='password'
                        placeholder='********' 
                        className='AuthForm__input AuthForm__input_pass'
                        name='auth_pass'
                        value={props.pass}
                        onChange={props.handleChangePass}      
                        required 
                    />
                    <span className="AuthForm__input-error">{props.passErr}</span>

                </div>
                <button 
                    type="submit" 
                    className="AuthForm__submit" 
                    aria-label={props.buttonText}
                    disabled={!props.isValid}
                >{props.buttonText}</button>
            </form>
            <div className="AuthForm__textArea">
                <p className="AuthForm__text">{props.text}</p>
                <Link className="AuthForm__link" to={props.link}>{props.linkText}</Link>
            </div>
        </section>
    );
};

export default AuthForm;