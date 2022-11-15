import './Register.css';
import AuthForm from '../components/AuthForm/AuthForm';

function Register() {
    return (
        <section className="Register">
            <AuthForm
                title='Добро пожаловать!'
                buttonText='Зарегистрироваться'
                text='Уже зарегистрированы?'
                link='/signin'
                linkText='Войти'
            >
                <p className="AuthForm__inputName">Имя</p>
                <input 
                    type="text" 
                    defaultValue="Виталий" 
                    className="AuthForm__input" 
                    required 
                />
            </AuthForm> 

        </section>
    )
};

export default Register;