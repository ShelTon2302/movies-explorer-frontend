import './AboutMe.css';
import foto from '../../images/aboutme_foto.svg';

function AboutMe() {
    return (
        <section className="AboutMe">
            <h2 className="AboutMe__title">Студент</h2>
            <div className="AboutMe__grid">
                <img className="AboutMe__foto" src={foto} alt="Foto"></img>
                <h3 className="AboutMe__name">Виталий</h3>
                <h5 className="AboutMe__prof">Фронтенд-разработчик, 30 лет</h5>
                <p className="AboutMe__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. 
                    У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. 
                    С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, 
                    начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                <p className="AboutMe__link">Github</p>
            </div>
        </section>
    );
}

export default AboutMe;