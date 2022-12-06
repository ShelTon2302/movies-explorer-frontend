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
    const [textReg, setTextReg] = React.useState('');

    const [begin, setBegin] = React.useState({}) 

    React.useEffect(() => {
        setMoviesFind(props.savedMovies);
        if (props.savedMovies.length > 0) {
            setIsMovies(true);
        }
        setMoviesFindShot(props.savedMoviesShot);
        if (props.savedMoviesShot.length > 0) {
            setIsMoviesShot(true);
        }
    }, []);

    React.useEffect(() => {
        if (validForm.values.Search) {
            setErrorText('');
        }
    }, [validForm.values.Search])

    React.useEffect(() => {
        let find = FindMovies({
            moviesList: props.savedMovies,
            isShot: false,
            textReg: textReg,
        });
        if (find.find.length > 0) {
            setMoviesFind(find.find);
            setIsMovies(true);
            let findShot = FindMovies({
                moviesList: find.find,
                isShot: true,
                textReg: '',
            });
            if (findShot.find.length > 0) {
                setMoviesFindShot(findShot.find);
                setIsMoviesShot(true);
            } else {
                setIsMoviesShot(false);
                setTextMessageShot('Здесь пока ничего нет!')
            }
    
        } else {
            setIsMovies(false);
            setTextMessage('Здесь пока ничего нет!');
            setIsMoviesShot(false);
            setTextMessageShot('Здесь пока ничего нет!');
        }
    }, [props.savedMovies])

    function  setFindMoviesParam(data) {
        setMoviesFind(data.find); 
        setTextMessage(data.message);
        setIsMovies(data.isEnable);

    }

    function  setFindMoviesShotParam(data) {
        console.log(data)
        setMoviesFindShot(data.find); 
        setTextMessageShot(data.message);
        setIsMoviesShot(data.isEnable);

    }

    function handleFindMoviesSubmit (e) {
        e.preventDefault();
        if (!validForm.values.Search) {
            setErrorText('Нужно ввести ключевое слово');
            return;
        };
        setTextReg(validForm.values.Search);
        setEnableForm(false);
        console.log(props.savedMovies)
        let find = FindMovies({
            moviesList: props.savedMovies,
            isShot: false,
            textReg: validForm.values.Search,
        });
        console.log(find);
        setFindMoviesParam(find);
        let findShot = FindMovies({
            moviesList: find.find,
            isShot: true,
            textReg: '',
        });
        setFindMoviesShotParam(findShot)
        setBegin({}); 

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
                checkboxStatus={checkboxState}
                moreButtonEnable={true}
                begin={begin}
            />
            <Footer />
        </div>
    )
};

export default SavedMovies;