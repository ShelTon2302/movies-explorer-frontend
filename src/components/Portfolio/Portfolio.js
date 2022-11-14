import './Portfolio.css';
import imgLink from '../../images/portfolio_link.svg';

function Portfolio() {
    return (
        <section className="Portfolio" id='portfolio'>
            <h2 className="Portfolio__title">Портфолио</h2>
            <ul className="Portfolio__table">
                <li className="Portfolio__tableRow">
                    <a className="Portfolio__item" href='https://github.com/ShelTon2302/how-to-learn' target='_blank' rel='noreferrer'>Статичный сайт</a>
                    <a className="Portfolio__item" href='https://github.com/ShelTon2302/how-to-learn' target='_blank' rel='noreferrer'><img className="Portfolio__img" src={imgLink} alt='ссылка'></img></a>
                </li>
                <li className="Portfolio__tableRow">
                    <a className="Portfolio__item" href='https://github.com/ShelTon2302/russian-travel' target='_blank' rel='noreferrer'>Адаптивный сайт</a>
                    <a className="Portfolio__item" href='https://github.com/ShelTon2302/russian-travel' target='_blank' rel='noreferrer'><img className="Portfolio__img" src={imgLink} alt='ссылка'></img></a>
                </li>
                <li className="Portfolio__tableRow">
                    <a className="Portfolio__item" href='https://project-mesto.nomoredomains.icu/' target='_blank' rel='noreferrer'>Одностраничное приложение</a>
                    <a className="Portfolio__item" href='https://project-mesto.nomoredomains.icu/' target='_blank' rel='noreferrer'><img className="Portfolio__img" src={imgLink} alt='ссылка'></img></a>
                </li>
            </ul>
        </section>
    );
};

export default Portfolio;

