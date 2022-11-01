import './AboutProject.css';

function AboutProject() {
    return (
        <div className="AboutProject">
            <h2 className="AboutProject__title">О проекте</h2>
            <div className="AboutProject__textArea">
                <h3 className="AboutProject__textTitle">Дипломный проект включал 5 этапов</h3>
                <h3 className="AboutProject__textTitle">На выполнение диплома ушло 5 недель</h3>
                <p className="AboutProject__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                <p className="AboutProject__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
        </div>
    );
}

export default AboutProject;