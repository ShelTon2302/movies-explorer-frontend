import './MoviesCardList.css';
import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
    const [hiddenMoreButton, setHiddenMoreButton] = React.useState(true);
    const [endNum, setEndNum] = React.useState(0);
    const [pathOfMovies, setPathOfMovies] = React.useState([]);
    const [numberOfItem, setNumberOfItem] = React.useState(7);

    React.useEffect(() => {
        if (props.movies.length > numberOfItem && !props.isSaved)
        {
            setHiddenMoreButton(false);
            setEndNum(endNum + numberOfItem);
            setPathOfMovies(props.movies.slice(0, numberOfItem));
        }

        window.addEventListener('resize', handleResizeWindow);

        return () => {
            window.addEventListener('resize', handleResizeWindow);
        }
    }, [props.begin]);


    function pressMoreButton () {
        setEndNum(endNum + numberOfItem);
        if (endNum < props.movies.length) {
            setPathOfMovies(props.movies.slice(0, endNum));
        } else {
            setHiddenMoreButton(true);
            setEndNum(0);
            setPathOfMovies([]);

        }        
    }


    function handleResizeWindow(event) {
        if (event.target.window.innerWidth < 420) {
            setNumberOfItem(5);
        } else {
            setNumberOfItem(7);
        }
      }
      

    
    return (
        <section className="MoviesCardList">
            {
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