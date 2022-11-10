import './Promo.css';
import img from '../../images/promo_img.svg';

function Promo() {
    return (
        <section className="Promo">
            <div className="Promo__info">
                <div className="Promo__text">
                    <h1 className="Promo__title">Учебный проект студента факультета Веб&#8288;-&#8288;разработки.</h1>
                    <p className="Promo__notice">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                </div>
                <img className="Promo__img" src={img} alt="logo"></img>
            </div>
            <button type="button" className="Promo__btn">Узнать больше</button>
        </section>
    );
}

export default Promo;