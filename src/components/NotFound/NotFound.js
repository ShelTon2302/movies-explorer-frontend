import { Link } from 'react-router-dom';
import './NotFound.css'

function NotFound() {
    return (
        <div className="NotFound">
            <h2 className="NotFound__title">404</h2>
            <p className="NotFound__description">Страница не найдена</p>
            <Link className="NotFound__link" to='/'>Назад</Link>
        </div>
    );
};

export default NotFound;