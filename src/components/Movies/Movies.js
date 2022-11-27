import React from 'react';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import FindMovies from '../../utils/FindMovies';
import './Movies.css'
import Footer from '../Footer/Footer';
import { useFormWithValidation } from '../../utils/Validation'; 

function Movies(props) {
    const validForm = useFormWithValidation();
    const [loadingMovies, setLoadingMovies] = React.useState(false);
    const [moviesListEnable, setMoviesListEnable] = React.useState(false)
    const [textMessage, setTextMessage] =React.useState('Здесь пока ничего нет!');
    const [moviesFind, setMoviesFind] = React.useState([]);
    const [begin, setBegin] = React.useState({}) 

    React.useEffect(() => {
        if (props.finded.length > 0) {
            setMoviesFind(props.finded);
            setMoviesListEnable(true)
        }
    }, []);

    function handleSetFindedMovies (data) {
        props.setFinded(data);
    }
    
    function handleSetTextReq (data) {
        props.setTextReq(data);
    }


    function handleFindMoviesSubmit (e) {
        e.preventDefault();
        setLoadingMovies(true);
        if (props.allMovies.length > 0) { 
            let find = FindMovies(props.allMovies, props.shotState, validForm.values.Search)
            setLoadingMovies(false);
            if (find.length === 0) {
                setMoviesListEnable(false);
                setTextMessage('Ничего не найдено');
            } else {
                setMoviesFind(find);
                setMoviesListEnable(true);
                handleSetFindedMovies(find);
                handleSetTextReq(validForm.values.Search);
                setBegin({});
            }
        } else {
                setTextMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
                setMoviesListEnable(false);
                setLoadingMovies(false);
        }
    }

    return (
        <div className="Movies">
            <Header />
            <SearchForm 
                loadingMovies={loadingMovies}
                setLoadingMovies={setLoadingMovies}
                textReq={validForm.values.Search}
                textReqErr={validForm.errors.Search}
                setTextReq={validForm.handleChange}
                textReqSaved={props.textReq}
                checkboxStatus={props.shotState}
                setCheckboxStatus={props.setShotState}
                onSubmit={handleFindMoviesSubmit}
                isValid={validForm.isValid}
            />
            {loadingMovies 
                ? 
                    <Preloader /> 
                :
                    moviesListEnable
                        ?
                            <MoviesCardList 
                                movies={moviesFind}
                                isSaved={false}
                                savedMovies={props.savedMovies}
                                handleSetSavedMovies={props.handleSetSavedMovies}
                                numberOfItem={props.numberOfItem}
                                begin={begin}
                            />
                        :
                            <p className='Movies__text'>{textMessage}</p>
            }
            <Footer />
        </div>
    );
};

export default Movies;