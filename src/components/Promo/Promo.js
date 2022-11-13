import './Promo.css';
import img from '../../images/promo_img.svg';
import React from 'react';

function Promo() {
    const [onMenu, setOnMenu] = React.useState(false);

    function changeVisibilityMenu() {
        if (onMenu) {
            setOnMenu(false);
        } else {
            setOnMenu(true);
        }
    }

    return (
        <section className="Promo">
            <div className="Promo__info">
                <img className="Promo__img" src={img} alt="logo"></img>
                <div className="Promo__text">
                    <h1 className="Promo__title">Учебный проект студента факультета Веб&#8288;-&#8288;разработки.</h1>
                    <p className="Promo__notice">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                </div>
            </div>
            <button type="button" className={`Promo__btn${onMenu ? ' Promo_btn_enabled' : ''}`} onClick={changeVisibilityMenu}>{onMenu ? 'Скрыть' : 'Узнать больше'}</button>
            <nav className="Promo__menu" hidden={!onMenu}>
                <a href="#aboutProject" className="Promo__menuLink">О проекте</a>
                <a href="#techs" className="Promo__menuLink">Технологии</a>
                <a href="#aboutMe" className="Promo__menuLink">Обо мне</a>
                <a href="#portfolio" className="Promo__menuLink">Портволио</a>
            </nav>
        </section>
    );
}

export default Promo;