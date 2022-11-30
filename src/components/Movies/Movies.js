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
    const [loadingMovies, setLoadingMovies] = React.useState(false);
    const [regInfo, setRegInfo] = React.useState({});
    const [textMessage, setTextMessage] =React.useState('Здесь пока ничего нет!');
    const [textMessageShot, setTextMessageShot] =React.useState('Здесь пока ничего нет!');
    const [isMovies, setIsMovies] = React.useState(false);
    const [isMoviesShot, setIsMoviesShot] = React.useState(false);
    const [allMovies, setAllMovies] = React.useState([]);
    const [textReg, setTextReg] = React.useState(props.regInfo.textReg);
    const [checkboxState, setCheckboxState] = React.useState(false);
    const [moviesFind, setMoviesFind] = React.useState([]);
    const [moviesFindShot, setMoviesFindShot] = React.useState([]);

    const [begin, setBegin] = React.useState({}) 
    
    React.useEffect(() => {
        setRegInfo(JSON.parse(localStorage.getItem('regInfo')));
        console.log(regInfo, props.regInfo);
        if (localStorage.getItem('allMovies')) {
            setAllMovies(JSON.parse(localStorage.getItem('allMovies')));
        }
         if (props.regInfo) {
            if (props.regInfo.moviesFind.length > 0) {
                handleSetMoviesFind(props.regInfo.moviesFind);
                setIsMovies(true);
            }
            if (props.regInfo.moviesFindShot.length > 0) {
                setMoviesFindShot(props.regInfo.moviesFindShot);
                setIsMoviesShot(true);
            }
            setCheckboxState(props.regInfo.checkboxState);
            setTextReg(props.regInfo.textReg);
        }
        console.log('useEffect')
    }, []);

    function handleSetMoviesFind (data) {
        console.log(data)
        setMoviesFind(data);
        console.log(moviesFind)
    }

    function handleSetMoviesFindShot (data) {
        setMoviesFindShot(data);
    }




    function handleFindMoviesSubmit (e) {
        e.preventDefault();
        setTextReg(validForm.values.Search);

        if (localStorage.getItem('allMovies') === null) {
            setLoadingMovies(true);
            getMovies()
                .then((res) => {
                    localStorage.setItem('allMovies', JSON.stringify(res));
                    FindMovies(
                        res, 
                        validForm.values.Search, 
                        handleSetMoviesFind, 
                        handleSetMoviesFindShot, 
                        setTextMessage, 
                        setTextMessageShot,
                        setIsMovies,
                        setIsMoviesShot);
                })
                .then((res) => {
                    setAllMovies(res);
                    setLoadingMovies(false);
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
                validForm.values.Search,
                handleSetMoviesFind, 
                handleSetMoviesFindShot, 
                setTextMessage, 
                setTextMessageShot,
                setIsMovies,
                setIsMoviesShot
            );
        } 
        console.log(moviesFind)
        
        localStorage.setItem('findedMovies', JSON.stringify(moviesFind));
        localStorage.setItem('findedMoviesShot', JSON.stringify(moviesFindShot));
        localStorage.setItem('checkbox', JSON.stringify(checkboxState));
        localStorage.setItem('textReg', textReg);
        localStorage.setItem('regInfo', JSON.stringify({
            moviesFind,
            moviesFindShot,
            checkboxState,
            textReg
        }));
        console.log(moviesFind, textReg, checkboxState, JSON.parse(localStorage.getItem('findedMovies')));
        
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
                textReqSaved={textReg}
                checkboxStatus={checkboxState}
                setCheckboxStatus={setCheckboxState}
                onSubmit={handleFindMoviesSubmit}
                isValid={validForm.isValid}
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