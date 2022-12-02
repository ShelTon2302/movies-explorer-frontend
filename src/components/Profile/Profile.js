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
    const [disableSubmit, setDisableSubmit] = React.useState(false);
    const [disableForm, setDisableForm] = React.useState(false);


    React.useEffect(() => {
        if (
            // введенный email совпадает с сохраненным или не менялся
            (validForm.values.profile_email === currentUser.email || !validForm.values.profile_email)
                &&
            // введенное имя совпадает с сохраненным или не менялось
            (validForm.values.profile_name === currentUser.name || !validForm.values.profile_name)
        ) {
            console.log('true')
            setDisableSubmit(true);
        } else {
            console.log('false')
            setDisableSubmit(false);
 
        }

        console.log('error', disableSubmit);

    }, [validForm.handleChange])


    function handleSubmit (e) {
        e.preventDefault();
        setDisableForm(true);
        api.setProfileInfo(
            validForm.values.profile_email ? validForm.values.profile_email : currentUser.email, 
            validForm.values.profile_name ? validForm.values.profile_name : currentUser.name, 
        )
        .then ((res) => {
            if(res){
                props.setCurrentUser({
                    name: res.name,
                    email: res.email,
                    _id: res._id,
                });
                props.handleChangeAuthStatus({
                    msg: 'Информация пользователя изменена!',
                    error: false
                });
                props.handleTooltipClick();

                //props.history.goBack();
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
                props.handleChangeLoggedIn(false);
                localStorage.removeItem('regInfo');
            })
            .then(() => {
                props.history.push('/');        
            })
            .catch((err) => {
                props.handleChangeAuthStatus({
                    msg: 'Выход пользователя не выполнен!',
                    error: true
                });
                props.handleTooltipClick();
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
                            disabled={disableForm}
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
                            //pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                            value={validForm.values.profile_email}
                            onChange={validForm.handleChange} 
                            disabled={disableForm}     
                            required 
                        />
                        <span className="Profile__input-error">{validForm.errors.profile_email}</span>
                    </div>
                    <button 
                        className="Profile_button" 
                        type="submit" 
                        aria-label="Редактировать"
                        disabled={!validForm.isValid || disableSubmit || disableForm}
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