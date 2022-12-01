import React from 'react';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import FindMovies from '../../utils/FindMovies';
import './Movies.css'
import Footer from '../Footer/Footer';
import { useFormWithValidation } from '../../utils/Validation'; 
import { getMovies } from '../../utils/MoviesApi';

function Movies(props) {
    const validForm = useFormWithValidation();
    const [errorText, setErrorText] = React.useState('');
    const [enableForm, setEnableForm] = React.useState(true);
    const [loadingMovies, setLoadingMovies] = React.useState(false);
    const [textMessage, setTextMessage] =React.useState('Здесь пока ничего нет!');
    const [textMessageShot, setTextMessageShot] =React.useState('Здесь пока ничего нет!');
    const [isMovies, setIsMovies] = React.useState(false);
    const [isMoviesShot, setIsMoviesShot] = React.useState(false);
    const [allMovies, setAllMovies] = React.useState([]);
    const [textReg, setTextReg] = React.useState(props.regInfo ? props.regInfo.textReg : '');
    const [checkboxState, setCheckboxState] = React.useState(false);
    const [moviesFind, setMoviesFind] = React.useState([]);
    const [moviesFindShot, setMoviesFindShot] = React.useState([]);

    const [begin, setBegin] = React.useState({}) 
    
    React.useEffect(() => {
        setBegin({});

        if (localStorage.getItem('allMovies')) {
            setAllMovies(JSON.parse(localStorage.getItem('allMovies')));
        }
         if (props.regInfo) {
            if (props.regInfo.moviesFind.length > 0) {
                setMoviesFind(props.regInfo.moviesFind);
                setIsMovies(true);
            }
            setCheckboxState(props.regInfo.checkboxState);
            setTextReg(props.regInfo.textReg);
        }
        console.log('useEffect')
    }, []);

    React.useEffect(() => {
        if (validForm.values.Search) {
            setErrorText('');
        }
    }, [validForm.values.Search])

    function handleFindMoviesSubmit (e) {
        e.preventDefault();
        if (!validForm.values.Search && !textReg) {
            setErrorText('Нужно ввести ключевое слово');
            return;
        };
        if (validForm.values.Search) {
            setTextReg(validForm.values.Search);
        };
        setEnableForm(false);
        console.log(textReg)

        if (localStorage.getItem('allMovies') === null) {
            setLoadingMovies(true);
            getMovies()
                .then((res) => {
                    localStorage.setItem('allMovies', JSON.stringify(res));
                    FindMovies(
                        res, 
                        validForm.values.Search ? validForm.values.Search : textReg,
                        setMoviesFind, 
                        setMoviesFindShot, 
                        setTextMessage, 
                        setTextMessageShot,
                        setIsMovies,
                        setIsMoviesShot);
                })
                .then((res) => {
                    setAllMovies(res);
                    setLoadingMovies(false);
                    setBegin({});
                })
                .catch(() => {
                    setTextMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
                    setTextMessageShot('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
                    setIsMovies(false);
                    setIsMoviesShot(false);
                    setLoadingMovies(false);
                    return;    
                });
        }  else {
            FindMovies(
                allMovies, 
                validForm.values.Search ? validForm.values.Search : textReg,
                setMoviesFind, 
                setMoviesFindShot, 
                setTextMessage, 
                setTextMessageShot,
                setIsMovies,
                setIsMoviesShot
            );
            setBegin({});
        };        
        localStorage.setItem('regInfo', JSON.stringify({
            moviesFind,
            moviesFindShot,
            checkboxState,
            textReg
        }));
        setEnableForm(true);    
    }

    return (
        <div className="Movies">
            <Header />
            <SearchForm 
                loadingMovies={loadingMovies}
                setLoadingMovies={setLoadingMovies}
                textReq={validForm.values.Search}
                textReqErr={errorText}
                setTextReq={validForm.handleChange}
                textReqSaved={textReg}
                checkboxStatus={checkboxState}
                setCheckboxStatus={setCheckboxState}
                onSubmit={handleFindMoviesSubmit}
                isValid={validForm.isValid}
                enableForm={enableForm}
            />
            {loadingMovies 
                ? 
                    <Preloader /> 
                :
                    <MoviesCardList
                        isMovies={checkboxState ? isMoviesShot : isMovies}
                        textMessage={checkboxState ? textMessageShot : textMessage}
                        movies={checkboxState ? moviesFindShot : moviesFind}
                        isSaved={false}
                        savedMovies={props.savedMovies}
                        handleSetSavedMovies={props.handleSetSavedMovies}
                        numberOfItem={props.numberOfItem}
                        begin={begin}
                    />
            }
            <Footer />
        </div>
    );
};

export default Movies;