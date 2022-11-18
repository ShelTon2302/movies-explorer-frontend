import './Login.css';
import AuthForm from '../AuthForm/AuthForm';

function Login() {
    return (
        <section className="Login">
            <AuthForm 
                title='Рады видеть!'
                buttonText='Войти'
                text='Ещё не зарегистрированы?'
                link='/signup'
                linkText='Регистрация'
            />
        </section>
    )
}

export default Login;