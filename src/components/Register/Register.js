import React from 'react';
import './Register.css';
import AuthForm from '../AuthForm/AuthForm';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import api from '../../utils/MainApi';
import { useFormWithValidation } from '../../utils/Validation'; 

function Register(props) {
    const validForm = useFormWithValidation();

    function handleRegSubmit(e) {
        e.preventDefault();
        api.register(validForm.values.auth_name, validForm.values.auth_email, validForm.values.auth_pass)
            .then ((res) => {
                if (res) {
                    props.handleChangeLoggedIn(true);
                    props.handleChangeLogginUser();
                    /*props.setCurrentUser({
                        name: res.name,
                        email: res.email,
                        _id: res._id,
                    });
                    props.history.push('/movies');*/
                } else {
                    props.handleChangeAuthStatus({
                    msg: 'Что-то пошло не так! Попробуйте ещё раз.',
                    error: true
                    });
                    props.handleTooltipClick();
                }
                })
            .catch((err) => console.log(err))
            .finally(validForm.resetForm);
    }

    return (
        <section className="Register">
            <AuthForm
                title='Добро пожаловать!'
                buttonText='Зарегистрироваться'
                text='Уже зарегистрированы?'
                link='/signin'
                linkText='Войти'
                email={validForm.values.auth_email}
                pass={validForm.values.auth_pass}
                handleChangeEmail={validForm.handleChange}
                handleChangePass={validForm.handleChange}
                emailErr={validForm.errors.auth_email}
                passErr={validForm.errors.auth_pass}
                isValid={validForm.isValid}
                onSubmit={handleRegSubmit}
            >
                <p className="AuthForm__inputName">Имя</p>
                <input 
                    type='name' 
                    placeholder='Виталий'
                    className='AuthForm__input AuthForm__input_email'
                    name='auth_name'
                    minLength={2}
                    maxLength={30}
                    value={validForm.values.auth_name}
                    onChange={validForm.handleChange} 
                    required 
                />
                <span className="AuthForm__input-error">{validForm.errors.auth_name}</span>
            </AuthForm> 
            <InfoTooltip 
                state={props.authStatus}
                isOpen={props.isInfoTooltipOpen}
                onClose={props.closeAllPopups}
            />

        </section>
    )
};

export default Register;