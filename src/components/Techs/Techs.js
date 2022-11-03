import './Techs.css';

function Techs() {
    return (
        <div className="Techs">
            <h2 className="Techs__title">Технологии</h2>
            <h3 className="Techs__titleText">7 технологий</h3>
            <p className="Techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            <ul className="Techs__list">
                <li className="Techs__listItem">HTML</li>
                <li className="Techs__listItem">CSS</li>
                <li className="Techs__listItem">JS</li>
                <li className="Techs__listItem">React</li>
                <li className="Techs__listItem">Git</li>
                <li className="Techs__listItem">Express.js</li>
                <li className="Techs__listItem">mongoDB</li>
            </ul>
        </div>
    );
}

export default Techs;
