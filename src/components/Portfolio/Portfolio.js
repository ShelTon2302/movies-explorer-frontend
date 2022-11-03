import './Portfolio.css';
import imgLink from '../../images/portfolio_link.svg';

function Portfolio() {
    return (
        <div className="Portfolio">
            <h2 className="Portfolio__title">Портфолио</h2>
            <div className="Portfolio__table">
                <h3 className="Portfolio__item">Статичный сайт</h3>
                <img className="Portfolio__img" src={imgLink} alt='ссылка'></img>
                <h3 className="Portfolio__item">Адаптивный сайт</h3>
                <img className="Portfolio__img" src={imgLink} alt='ссылка'></img>
                <h3 className="Portfolio__item">Одностраничное приложение</h3>
                <img className="Portfolio__img" src={imgLink} alt='ссылка'></img>
            </div>
        </div>
    );
};

export default Portfolio;

