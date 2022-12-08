import './MoviesCardList.css';
import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { NUMBER_OF_ITEMS, NUMBER_OF_ITEMS_MOB, WIDTH_OF_MOB } from '../../const/const'

function MoviesCardList(props) {
    const [hiddenMoreButton, setHiddenMoreButton] = React.useState(true);
    const [endNum, setEndNum] = React.useState(NUMBER_OF_ITEMS);
    const [pathOfMovies, setPathOfMovies] = React.useState([]);
    const [numberOfCard, setNumberOfCard] = React.useState(NUMBER_OF_ITEMS);

    React.useEffect(() => {
        if (props.widthWin < WIDTH_OF_MOB) {
            if (numberOfCard !== NUMBER_OF_ITEMS_MOB) {
                props.setBegin({});
            }
            setNumberOfCard(NUMBER_OF_ITEMS_MOB);
        } else {
            if (numberOfCard !== NUMBER_OF_ITEMS) {
                props.setBegin({});
            }
            setNumberOfCard(NUMBER_OF_ITEMS);
        }

    }, [props.widthWin]);

    
    React.useEffect(() => {
        if (props.movies.length > numberOfCard && !props.isSaved)
        {
            setHiddenMoreButton(false);
            setEndNum(endNum + numberOfCard);
            setPathOfMovies(props.movies.slice(0, numberOfCard));
        } else {
            setHiddenMoreButton(true);
            setEndNum(numberOfCard);
        }
    }, [props.begin, props.checkboxStatus]);


    function pressMoreButton () {
        setEndNum(endNum + numberOfCard);
        if (endNum < props.movies.length) {
            setPathOfMovies(props.movies.slice(0, endNum));
        } else {
            setHiddenMoreButton(true);
            setEndNum(NUMBER_OF_ITEMS);
            setPathOfMovies([]);
        }        
    }
    
    return (
        <section className="MoviesCardList">
            {
                props.isMovies
                    ?
                        hiddenMoreButton
                            ?
                                props.movies.map(item => <MoviesCard 
                                    item={item}
                                    isSaved={props.isSaved}
                                    savedMovies={props.savedMovies}
                                    handleSetSavedMovies={props.handleSetSavedMovies}
                                />)
                            :
                                pathOfMovies.map(item => <MoviesCard 
                                    item={item}
                                    isSaved={props.isSaved}
                                    savedMovies={props.savedMovies}
                                    handleSetSavedMovies={props.handleSetSavedMovies}
                                />)
                    :
                        <p className='SavedMovies__text'>{props.textMessage}</p>
            }
            <button 
                type="button" 
                className={`MoviesCardList__yetBtn${hiddenMoreButton ? ' MoviesCardList__yetBtn_visibility_hidden' : ''}`}
                aria-label="Ещё"
                onClick={pressMoreButton}
            >Ещё</button>
        </section>
    )
};

export default MoviesCardList;