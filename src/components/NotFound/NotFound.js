import './NotFound.css';

function NotFound({history}) {
    function goBack() {
        history.goBack();
    }

    return (
        <div className="NotFound">
            <h2 className="NotFound__title">404</h2>
            <p className="NotFound__description">Страница не найдена</p>
            <button type='button' className="NotFound__button" onClick={goBack}>Назад</button>
        </div>
    );
};

export default NotFound;