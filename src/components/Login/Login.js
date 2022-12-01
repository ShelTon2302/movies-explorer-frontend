import React from 'react';
import './Login.css';
import AuthForm from '../AuthForm/AuthForm';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import api from '../../utils/MainApi';
import { useFormWithValidation } from '../../utils/Validation'; 

function Login(props) {
    const validForm = useFormWithValidation();

    function handleLogSubmit(e) {
        e.preventDefault();
        api.login(validForm.values.auth_email, validForm.values.auth_pass)
            .then ((res) => {
            if (res) {
                props.handleChangeLoggedIn(true);
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