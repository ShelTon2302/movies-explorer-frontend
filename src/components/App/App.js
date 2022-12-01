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
import ProtectedRoute from '../../utils/ProtectedRoute';

function App() {
  const [currentUser, setCurrentUser] = React.useState({
    name: 'Vasiliy',
    email: 'pochta@yandex.ru',
    _id: ''
  });
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [savedMoviesShot, setSavedMoviesShot] = React.useState([]);
  const [regInfo, setRegInfo] = React.useState({});
  const [authStatus, setAuthStatus] = React.useState({});
  const [loginUser, setLoginUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false)
  const history = useHistory();
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [numberOfItem, setNumberOfItem] = React.useState(7); //количество показываемых карточек

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
        }
      })
      .catch(() => {
        setLoggedIn(false);
        localStorage.removeItem('regInfo');
        history.push('/');
      });
      
    // Получение списка сохраненных фильмов пользователя
    api.getSavedMovies()
    .then((res) => {
      if (res) {
        setSavedMovies(res.movies);
        // localStorage.setItem('savedMovies', JSON.stringify(res.movies));
        setSavedMoviesShot(res.movies.filter(function (item) {
          return (
              item.duration <= 40 
          );
      }));
      }
    })
    .catch((err) => {
      console.log(err);
    });
    
    setRegInfo(JSON.parse(localStorage.getItem('regInfo')));

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
            savedMovies={savedMovies}
            regInfo={regInfo}
            handleSetSavedMovies={setSavedMovies}
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
            savedMoviesShot={savedMoviesShot}
            handleSetSavedMoviesShot={setSavedMoviesShot}
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
