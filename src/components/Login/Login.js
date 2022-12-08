import React from 'react';
import './Login.css';
import AuthForm from '../AuthForm/AuthForm';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import api from '../../utils/MainApi';
import { useFormWithValidation } from '../../utils/Validation';

function Login(props) {
    const validForm = useFormWithValidation();
    const [disableForm, setDisableForm] = React.useState(false)

    function handleLogSubmit(e) {
        e.preventDefault();
        setDisableForm(true);
        api.login(validForm.values.auth_email, validForm.values.auth_pass)
            .then ((res) => {
            if (res) {
                localStorage.setItem('loggedIn', true)
                props.handleChangeLogginUser();
            } else {
                props.handleChangeAuthStatus({
                msg: 'Что-то пошло не так! Попробуйте ещё раз.',
                error: true
                });
                props.handleTooltipClick();
            }
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setDisableForm(false);
                validForm.resetForm();
                props.history.push('/movies');
            });
    }

    return (
        <section className="Login">
            <AuthForm 
                title='Рады видеть!'
                buttonText='Войти'
                text='Ещё не зарегистрированы?'
                link='/signup'
                linkText='Регистрация'
                email={validForm.values.auth_email}
                pass={validForm.values.auth_pass}
                handleChangeEmail={validForm.handleChange}
                handleChangePass={validForm.handleChange}
                emailErr={validForm.errors.auth_email}
                passErr={validForm.errors.auth_pass}
                isValid={validForm.isValid}
                disableForm={disableForm}
                onSubmit={handleLogSubmit}
            />
            <InfoTooltip 
                state={props.authStatus}
                isOpen={props.isInfoTooltipOpen}
                onClose={props.closeAllPopups}
            />
        </section>
    )
}

export default Login;