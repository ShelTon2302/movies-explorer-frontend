import React from 'react';
import api from '../../utils/MainApi';
import './MoviesCard.css';

function MoviesCard(props) {
    const isLiked = props.isSaved 
        ? 
            false 
        :
            props.savedMovies.some((item) => {
                return item.movieId === props.item.id;
            });
    const cardLikeButtonClassName = `MovieCard__like${isLiked ? ' MovieCard__like_active' : ''}`;

    let durationHHMM = getTimeFromMins(props.item.duration);

    function getTimeFromMins(mins) {
        let hours = Math.trunc(mins/60);
        let minutes = mins % 60;
        return hours + 'ч. ' + minutes + 'м.';
    };

    function handleAddDeleteMovies () {
        let currentSavedMovie = props.savedMovies.find((item) => {
            return item.movieId === props.item.id;
        });

        isLiked 
            ?   
                api.deleteMovie(currentSavedMovie._id)
                    .then((res) => {
                        props.handleSetSavedMovies(props.savedMovies.filter((m) => m._id !== currentSavedMovie._id));
                    })
            :
                api.addMovie({
                    country: props.item.country,
                    director: props.item.director,
                    duration: props.item.duration,
                    year: props.item.year,
                    description: props.item.description,
                    image: `https://api.nomoreparties.co${props.item.image.url}`,
                    trailerLink: props.item.trailerLink,
                    thumbnail: `https://api.nomoreparties.co${props.item.image.url}`,
                    movieId: props.item.id,
                    nameRU: props.item.nameRU,
                    nameEN: props.item.nameEN,
                })
                    .then((res) => {
                        api.getSavedMovies()
                            .then((res) => {
                            if (res) {
                                console.log(res);
                                props.handleSetSavedMovies(res.movies);
                            }
                            })
                            .catch((err) => {
                            console.log(err);
                            });
                    });
        if (props.isSaved) {
            api.deleteMovie(props.item._id)
            .then((res) => {
                props.handleSetSavedMovies(props.savedMovies.filter((m) => m._id !== currentSavedMovie._id));
            })

        } 

    }

    return (
        <div className="MoviesCard">
            <ul className="MoviesCard__item">
                <li className="MoviesCard__element">
                    <h4 className="MoviesCard__title">{props.item.nameRU}</h4>
                </li>
                <li className="MoviesCard__element">
                    <p className="MoviesCard__duration">{durationHHMM}</p>
                </li>
                <li className="MoviesCard__element">
                    <button 
                        type="button" 
                        className={props.isSaved ? 'MovieCard__delete' : cardLikeButtonClassName} 
                        aria-label={props.isSaved ? 'Удалить' : 'Нравится'}
                        onClick={handleAddDeleteMovies}
                    >
                    </button>
                </li>
                <li className="MoviesCard__element">
                    <a className="MoviesCard__link" href={props.item.trailerLink} target='_blank' rel='noreferrer'>
                        <img className="MoviesCard__thumbnail" src={props.isSaved ? props.item.thumbnail : `https://api.nomoreparties.co${props.item.image.url}`} alt="thumbnail "></img>
                    </a>
                </li>
            </ul>
        </div>

    )
};

export default MoviesCard;