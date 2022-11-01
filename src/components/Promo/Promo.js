import './Promo.css';
import Header from '../Header/Header';
import img from '../../images/promo_img.svg'

function Promo() {
    return (
        <div className="Promo">
            <Header>
                <p className="Header__regLink">Регистрация</p>
                <button type="button" className="Header__btnLog">Войти</button>
            </Header>
            <div className="Promo__info">
                <div className="Promo__text">
                    <h1 className="Promo__title">Учебный проект студента факультета Веб-&nbsp;разработки.</h1>
                    <p className="Promo__notice">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                </div>
                <img className="Promo__img" src={img} alt="logo"></img>
            </div>
            <button type="button" className="Promo__btn">Узнать больше</button>
        </div>
    );
}

export default Promo;