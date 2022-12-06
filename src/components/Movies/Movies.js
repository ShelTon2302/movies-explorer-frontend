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
    const [textReg, setTextReg] = React.useState('');
    const [checkboxState, setCheckboxState] = React.useState(false);
    const [moviesFind, setMoviesFind] = React.useState([]);
    const [moviesFindShot, setMoviesFindShot] = React.useState([]);

    const [begin, setBegin] = React.useState({}) 
    
    React.useEffect(() => {
        if (localStorage.getItem('allMovies')) {
            setAllMovies(JSON.parse(localStorage.getItem('allMovies')));
        }
        if (localStorage.getItem('regInfo')) {
            let regInfo = JSON.parse(localStorage.getItem('regInfo'));
            if (regInfo.moviesFind.length > 0) {
                setMoviesFind(regInfo.moviesFind);
                setIsMovies(true);
            }
            if (regInfo.moviesFindShot.length > 0) {
                setMoviesFindShot(regInfo.moviesFindShot);
                setIsMoviesShot(true);
            }

            setCheckboxState(regInfo.checkboxState);
            setTextReg(regInfo.textReg);
        }
    }, [begin, validForm.isValid]);

    React.useEffect(() => {
        if (validForm.values.Search) {
            setErrorText('');
        }
    }, [validForm.values.Search])

    function  setFindMoviesParam(data) {
        setMoviesFind(data.find); 
        setTextMessage(data.message);
        setIsMovies(data.isEnable);

    }

    function  setFindMoviesShotParam(data) {
        setMoviesFindShot(data.find); 
        setTextMessageShot(data.message);
        setIsMoviesShot(data.isEnable);

    }

    function handleFindMoviesSubmit (e) {
        e.preventDefault();
        if (!validForm.values.Search && !textReg) {
            setErrorText('Нужно ввести ключевое слово');
            return;
        };
        if (validForm.values.Search) {
            console.log(validForm.values.Search);
            setTextReg(validForm.values.Search);
        };
        setEnableForm(false);

        if (localStorage.getItem('allMovies') === null) {
            setLoadingMovies(true);
            getMovies()
                .then((res) => {
                    localStorage.setItem('allMovies', JSON.stringify(res));
                    setTextReg(validForm.values.Search);
                    let find = FindMovies({
                        moviesList: res,
                        isShot: false,
                        textReg: validForm.values.Search,
                    });
                    setFindMoviesParam(find);
                    
                    let findShot = FindMovies({
                        moviesList: find.find,
                        isShot: true,
                        textReg: validForm.values.Search,

                    });
                    setFindMoviesShotParam(findShot)
                    
                    setBegin({});
                    localStorage.setItem('regInfo', JSON.stringify({
                        moviesFind: find.find,
                        moviesFindShot: findShot.find,
                        checkboxState: checkboxState,
                        textReg: validForm.values.Search,
                    }));
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
            setTextReg(validForm.values.Search);
            let find = FindMovies({
                moviesList: allMovies,
                isShot: false,
                textReg: validForm.values.Search,
            });
            setFindMoviesParam(find);
            let findShot = FindMovies({
                moviesList: find.find,
                isShot: true,
                textReg: validForm.values.Search,

            });
            setFindMoviesShotParam(findShot)
            setBegin({});
            localStorage.setItem('regInfo', JSON.stringify({
                moviesFind: find.find,
                moviesFindShot: findShot.find,
                checkboxState: checkboxState,
                textReg: validForm.values.Search,
            }));
        };        
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
                        checkboxStatus={checkboxState}
                        begin={begin}
                    />
            }
            <Footer />
        </div>
    );
};

export default Movies;