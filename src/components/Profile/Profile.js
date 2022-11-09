import Header from '../Header/Header';
import './Profile.css'

function Profile() {
    return (
        <>
            <Header />
            <main className="Profile">
                <h2 className="Profile__title">Привет, Виталий!</h2>
                <form className="Profile__form">
                    <div className="Profile__inputGroup Profile__inputGroup_border_enable">
                        <p className="Profile__inputName">Имя</p>
                        <input 
                            type="text" 
                            value="Виталий" 
                            className="Profile__input" 
                            required 
                        />
                    </div>
                    <div className="Profile__inputGroup">
                        <p className="Profile__inputName">E-mail</p>
                        <input 
                            type="text" 
                            value="pochta@yandex.ru" 
                            className="Profile__input" 
                            required 
                        />
                    </div>
                    <button className="Profile_button" type="submit" aria-label="Редактировать">Редактировать</button>
                </form>
                <button className="Profile_button Profile_button_color_red" type="submit" aria-label="Выйти из аккаунта">Выйти из аккаунта</button>
            </main>
        </>
    );
};

export default Profile;