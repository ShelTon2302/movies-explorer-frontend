import './MoviesCard.css';

function MoviesCard(props) {
    const cardLikeButtonClassName = `MovieCard__like${props.isLiked ? ' MovieCard__like_active' : ''}`

    return (
        <div className="MoviesCard">
            <div className="MoviesCard__info">
                <h4 className="MoviesCard__title">{props.nameRU}</h4>
                <p className="MoviesCard__duration">{props.duration}</p>
                {props.isSaved
                ?
                    <button type="button" className="MovieCard__delete" aria-label="Удалить"></button>
                :
                    <button type="button" className={cardLikeButtonClassName} aria-label="Нравится"></button>
                }
            </div>
            <img className="MoviesCard__thumbnail" src={props.thumbnail} alt="thumbnail "></img>
        </div>
    )
};

export default MoviesCard;