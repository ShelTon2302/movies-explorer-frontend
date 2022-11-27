import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import { useFormWithValidation } from '../../utils/Validation';
import FindMovies from '../../utils/FindMovies';

function SavedMovies(props) {
    const validForm = useFormWithValidation();
    const [loadingMovies, setLoadingMovies] = React.useState(false);
    const [textMessage, setTextMessage] =React.useState('Здесь пока ничего нет!');
    const [savedMoviesFind, setSavedMoviesFind] = React.useState([]);

    React.useEffect(() => {
        if (props.finded.length > 0) {
            setSavedMoviesFind(props.finded);
        } else {
            setSavedMoviesFind(props.savedMovies);
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
        if (props.savedMovies.length > 0) { 
            let find = FindMovies(props.savedMovies, props.shotState, validForm.values.Search)
            setLoadingMovies(false);
            if (find.length === 0) {
                setTextMessage('Ничего не найдено');
            } else {
                setSavedMoviesFind(find);
                handleSetFindedMovies(find);
                handleSetTextReq(validForm.values.Search);
            }
        } else {
                setTextMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
                setLoadingMovies(false);
        }

    }

    return (
        <div className="SavedMovies">
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
                    (props.savedMovies.length > 0)
                        ?
                            <MoviesCardList 
                                movies={savedMoviesFind}
                                isSaved={true}
                                savedMovies={props.savedMovies}
                                handleSetSavedMovies={props.handleSetSavedMovies}
                                numberOfItem={props.numberOfItem}
                                moreButtonEnable={true}
                            />
                        :
                            <p className='SavedMovies__text'>{textMessage}</p>
            }
            <Footer />
        </div>
    )
};

export default SavedMovies;