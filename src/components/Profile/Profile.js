import React from 'react';
import Header from '../Header/Header';
import './Profile.css'
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import api from '../../utils/MainApi';
import { useFormWithValidation } from '../../utils/Validation'; 



function Profile(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const validForm = useFormWithValidation();

    function handleSubmit (e) {
        e.preventDefault();
        api.setProfileInfo(validForm.values.profile_email, validForm.values.profile_name)
        .then ((res) => {
            if(res){
                props.setCurrentUser({
                    name: res.name,
                    email: res.email,
                    _id: res._id,
                });
                props.history.goBack();
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

    function isExit () {
        api.logout()
            .then(() => {
                console.log(`1`);

                props.handleChangeLoggedIn(false);
            })
            .then(() => {
                console.log(`2`);

                props.history.push('/');        
            })
            .catch((err) => {
                console.log(`Выход пользователя не выполнен: ${err}`);
            });
    }

    return (
        <>
            <Header />
            <main className="Profile">
                <h2 className="Profile__title">Привет, {currentUser.name}!</h2>
                <form className="Profile__form" onSubmit={handleSubmit}>
                    <div className="Profile__inputGroup Profile__inputGroup_border_enable">
                        <p className="Profile__inputName">Имя</p>
                        <input 
                            type="text" 
                            defaultValue={currentUser.name} 
                            className="Profile__input"
                            name='profile_name'
                            minLength={2}
                            maxLength={30}
                            value={validForm.values.profile_name}
                            onChange={validForm.handleChange}      
                            required 
                        />
                        <span className="Profile__input-error">{validForm.errors.profile_name}</span>
                    </div>
                    <div className="Profile__inputGroup">
                        <p className="Profile__inputName">E-mail</p>
                        <input 
                            type="email" 
                            defaultValue={currentUser.email} 
                            className="Profile__input"
                            name='profile_email'
                            value={validForm.values.profile_email}
                            onChange={validForm.handleChange}      
                            required 
                        />
                        <span className="Profile__input-error">{validForm.errors.profile_email}</span>
                    </div>
                    <button 
                        className="Profile_button" 
                        type="submit" 
                        aria-label="Редактировать"
                        disabled={!validForm.isValid}
                    >Редактировать</button>
                </form>
                <button className="Profile_button Profile_button_color_red" type="submit" aria-label="Выйти из аккаунта" onClick={isExit}>Выйти из аккаунта</button>
            </main>
            <InfoTooltip 
                state={props.authStatus}
                isOpen={props.isInfoTooltipOpen}
                onClose={props.closeAllPopups}
            />
        </>
    );
};

export default Profile;