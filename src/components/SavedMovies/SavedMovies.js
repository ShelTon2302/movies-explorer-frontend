import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import { useFormWithValidation } from '../../utils/Validation';
import FindMovies from '../../utils/FindMovies';

function SavedMovies(props) {
    const validForm = useFormWithValidation();
    const [errorText, setErrorText] = React.useState('');
    const [enableForm, setEnableForm] = React.useState(true);
    const [loadingMovies, setLoadingMovies] = React.useState(false);
    const [textMessage, setTextMessage] =React.useState('Здесь пока ничего нет!');
    const [textMessageShot, setTextMessageShot] =React.useState('Здесь пока ничего нет!');
    const [isMovies, setIsMovies] = React.useState(false);
    const [isMoviesShot, setIsMoviesShot] = React.useState(false);
    const [checkboxState, setCheckboxState] = React.useState(false);
    const [moviesFind, setMoviesFind] = React.useState([]);
    const [moviesFindShot, setMoviesFindShot] = React.useState([]);

    React.useEffect(() => {
        if (props.savedMovies.length > 0) {
            setIsMovies(true);
            setMoviesFind(props.savedMovies);
            setIsMovies(true);
        }

        if (props.savedMoviesShot.length > 0) {
            setIsMoviesShot(true);
            setMoviesFindShot(props.savedMoviesShot);
            setIsMoviesShot(true);
        }
    }, []);

    React.useEffect(() => {
        if (validForm.values.Search) {
            setErrorText('');
        }
    }, [validForm.values.Search])

    React.useEffect(() => {
        if (props.savedMovies.length > 0) {
            setMoviesFind(props.savedMovies)
        } else {
            setIsMovies(false)
            setTextMessageShot('Здесь пока ничего нет!')
        }
    }, [props.savedMovies])




    function handleFindMoviesSubmit (e) {
        e.preventDefault();
        if (!validForm.values.Search) {
            setErrorText('Нужно ввести ключевое слово');
            return;
        };
        setEnableForm(false);
        FindMovies(
            props.savedMovies, 
            validForm.values.Search, 
            setMoviesFind, 
            setMoviesFindShot, 
            setTextMessage, 
            setTextMessageShot,
            setIsMovies,
            setIsMoviesShot);
        setEnableForm(true);   
    }

    return (
        <div className="SavedMovies">
            <Header />
            <SearchForm 
                loadingMovies={loadingMovies}
                setLoadingMovies={setLoadingMovies}
                textReq={validForm.values.Search}
                textReqErr={errorText}
                setTextReq={validForm.handleChange}
                textReqSaved={props.textReq}
                checkboxStatus={checkboxState}
                setCheckboxStatus={setCheckboxState}
                onSubmit={handleFindMoviesSubmit}
                isValid={validForm.isValid}
                enableForm={enableForm}
            />
            <MoviesCardList
                isMovies={checkboxState ? isMoviesShot : isMovies}
                textMessage={checkboxState ? textMessageShot : textMessage}
                movies={checkboxState ? moviesFindShot : moviesFind}
                isSaved={true}
                savedMovies={props.savedMovies}
                handleSetSavedMovies={props.handleSetSavedMovies}
                numberOfItem={props.numberOfItem}
                moreButtonEnable={true}
            />
            <Footer />
        </div>
    )
};

export default SavedMovies;