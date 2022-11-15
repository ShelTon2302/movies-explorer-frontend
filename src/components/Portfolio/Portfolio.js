import './Portfolio.css';
import imgLink from '../../images/portfolio_link.svg';

function Portfolio() {
    return (
        <section className="Portfolio" id='portfolio'>
            <h2 className="Portfolio__title">Портфолио</h2>
            <ul className="Portfolio__table">
                <li className="Portfolio__tableRow">
                    <a className="Portfolio__link" href='https://github.com/ShelTon2302/how-to-learn' target='_blank' rel='noreferrer'>
                        <h3 className="Portfolio__item">Статичный сайт</h3>
                        <img className="Portfolio__img" src={imgLink} alt='ссылка'></img>
                    </a>
                </li>
                <li className="Portfolio__tableRow">
                    <a className="Portfolio__link" href='https://github.com/ShelTon2302/how-to-learn' target='_blank' rel='noreferrer'>
                        <h3 className="Portfolio__item">Адаптивный сайт</h3>
                        <img className="Portfolio__img" src={imgLink} alt='ссылка'></img>
                    </a>

                </li>
                <li className="Portfolio__tableRow">
                    <a className="Portfolio__link" href='https://github.com/ShelTon2302/how-to-learn' target='_blank' rel='noreferrer'>
                        <h3 className="Portfolio__item">Одностраничное приложение</h3>
                        <img className="Portfolio__img" src={imgLink} alt='ссылка'></img>
                    </a>

                </li>
            </ul>
        </section>
    );
};

export default Portfolio;

