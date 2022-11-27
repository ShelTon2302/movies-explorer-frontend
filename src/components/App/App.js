import './App.css';
import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';
import api from '../../utils/MainApi';
import { getMovies } from '../../utils/MoviesApi';
import ProtectedRoute from '../../utils/ProtectedRoute';

function App() {
  const [currentUser, setCurrentUser] = React.useState({
    name: 'Vasiliy',
    email: 'pochta@yandex.ru',
    _id: ''
  });
  const [allMovies, setAllMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [authStatus, setAuthStatus] = React.useState({});
  const [loginUser, setLoginUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false)
  const history = useHistory();
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [numberOfItem, setNumberOfItem] = React.useState(7); //количество показываемых карточек

  const [textReqMovies, setTextReqMovies] = React.useState(''); //Запоминает текст запроса на странице Movies
  const [shotMoviesState, setShotMoviesState] = React.useState(false); //Запоминает положение чекбокса Короткометражки на странице Movies
  const [findedMovies, setFindedMovies] = React.useState([]); //Запоминает массив найденных фильмов на странице Movies

  const [textReqSavedMovies, setTextReqSavedMovies] = React.useState(''); //Запоминает текст запроса на странице SavedMovies
  const [shotSavedMoviesState, setShotSavedMoviesState] = React.useState(false); //Запоминает положение чекбокса Короткометражки на странице SavedMovies
  const [findedSavedMovies, setFindedSavedMovies] = React.useState([]); //Запоминает массив найденных фильмов на странице SavedMovies

  React.useEffect(() => {
    // Получение данных пользователя
    api.getProfileInfo()
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setCurrentUser({
            name: res.name,
            email: res.email,
            _id: res._id
          });
          history.push('/movies');
        }
      })
      .catch(() => {
        setLoggedIn(false);
        history.push('/');
      });
    
    // Запрос списка фильмов с сервера BeatFilm
    getMovies()
      .then((res) => {
        setAllMovies(res);
      })
      .catch((err) => {
          console.log(err);
      });
    
    // Получение списка сохраненных фильмов пользователя
    api.getSavedMovies()
    .then((res) => {
      if (res) {
        console.log(res);
        setSavedMovies(res.movies);
      }
    })
    .catch((err) => {
      console.log(err);
    });  

    console.log('useEffect');
  },[loginUser]);

  function handleChangeAuthStatus(data) {
    setAuthStatus({
      msg: data.msg,
      error: data.error
    });
  }

  function handleChangeLoginUser() {
    setLoginUser({});
  }

  function handleChangeLoggedIn(data) {
    setLoggedIn(data);
  }

  function closeTooltipPopup() {
    setIsInfoTooltipOpen(false);
  }

  function handleTooltipClick () {
    setIsInfoTooltipOpen(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <section className="App">
        <Switch>
          <Route exact path="/">
            <Main 
              loggedIn={loggedIn}
            />
          </Route>
          <Route path="/signin">
            <Login 
              history={history}
              authStatus={authStatus}
              handleChangeAuthStatus={handleChangeAuthStatus}
              handleChangeLogginUser={handleChangeLoginUser}
              handleChangeLoggedIn={handleChangeLoggedIn}
              setCurrentUser={setCurrentUser}
              handleTooltipClick={handleTooltipClick}
              isInfoTooltipOpen={isInfoTooltipOpen}
              closeAllPopups={closeTooltipPopup}
            />
          </Route>
          <Route path="/signup">
            <Register
              history={history}
              authStatus={authStatus}
              handleChangeAuthStatus={handleChangeAuthStatus}
              handleChangeLogginUser={handleChangeLoginUser}
              handleChangeLoggedIn={handleChangeLoggedIn}
              setCurrentUser={setCurrentUser}
              handleTooltipClick={handleTooltipClick}
              isInfoTooltipOpen={isInfoTooltipOpen}
              closeAllPopups={closeTooltipPopup}
            />
          </Route>
          <ProtectedRoute
            path="/movies"
            component={Movies}
            loggedIn={loggedIn}
            history={history}
            allMovies={allMovies}
            savedMovies={savedMovies}
            handleSetSavedMovies={setSavedMovies}
            textReq={textReqMovies}
            setTextReq={setTextReqMovies}
            shotState={shotMoviesState}
            setShotState={setShotMoviesState}
            finded={findedMovies}
            setFinded={setFindedMovies}
            numberOfItem={numberOfItem}
            setNumberOfItem={setNumberOfItem}
          />
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            loggedIn={loggedIn}
            history={history}
            savedMovies={savedMovies}
            handleSetSavedMovies={setSavedMovies}
            textReq={textReqSavedMovies}
            setTextReq={setTextReqSavedMovies}
            shotState={shotSavedMoviesState}
            setShotState={setShotSavedMoviesState}
            finded={findedSavedMovies}
            setFinded={setFindedSavedMovies}
            numberOfItem={numberOfItem}
            setNumberOfItem={setNumberOfItem}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            loggedIn={loggedIn}
            handleChangeLoggedIn={handleChangeLoggedIn}
            authStatus={authStatus}
            handleChangeAuthStatus={handleChangeAuthStatus}
            setCurrentUser={setCurrentUser}
            history={history}
            handleTooltipClick={handleTooltipClick}
            isInfoTooltipOpen={isInfoTooltipOpen}
            closeAllPopups={closeTooltipPopup}
          />
          <Route path="*">
            <NotFound 
              history={history}
            />
          </Route>
        </Switch>
      </section>
    </CurrentUserContext.Provider>
  );
}

export default App;
