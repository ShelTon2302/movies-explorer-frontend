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
import { SHOT_DURATIOM } from '../../const/const'

function App() {
  const [currentUser, setCurrentUser] = React.useState({
    name: 'Vasiliy',
    email: 'pochta@yandex.ru',
    _id: ''
  });
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [savedMoviesShot, setSavedMoviesShot] = React.useState([]);
  const [authStatus, setAuthStatus] = React.useState({});
  const [loginUser, setLoginUser] = React.useState({});
  const history = useHistory();
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);


  React.useEffect(() => {
    // Получение данных пользователя
    api.getProfileInfo()
      .then((res) => {
        if (res) {
          localStorage.setItem('loggedIn', true);
          setCurrentUser({
            name: res.name,
            email: res.email,
            _id: res._id
          });
        } else {
          localStorage.removeItem('loggedIn');
          localStorage.removeItem('allMovies');
          localStorage.removeItem('regInfo');
          localStorage.removeItem('checkbox');
          //history.push('/');
        }
      })
      .catch((err) => {
        //history.push('/');
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('allMovies');
        localStorage.removeItem('regInfo');
        localStorage.removeItem('checkbox');
      });
      
    // Получение списка сохраненных фильмов пользователя
    api.getSavedMovies()
      .then((res) => {
        if (res) {
          setSavedMovies(res.movies);
          setSavedMoviesShot(res.movies.filter(function (item) {
            return (
                item.duration <= SHOT_DURATIOM 
            );
        }));
        }
      })
      .catch((err) => {
        console.log(err);
      });

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
            <Main/>
          </Route>
          <ProtectedRoute
            path="/signin"
            component={Login}
            authWindow={true}
            history={history}
            authStatus={authStatus}
            handleChangeAuthStatus={handleChangeAuthStatus}
            handleChangeLogginUser={handleChangeLoginUser}
            setCurrentUser={setCurrentUser}
            handleTooltipClick={handleTooltipClick}
            isInfoTooltipOpen={isInfoTooltipOpen}
            closeAllPopups={closeTooltipPopup}
          />
          <ProtectedRoute
            path="/signup"
            component={Register}
            authWindow={true}
            history={history}
            authStatus={authStatus}
            handleChangeAuthStatus={handleChangeAuthStatus}
            handleChangeLogginUser={handleChangeLoginUser}
            setCurrentUser={setCurrentUser}
            handleTooltipClick={handleTooltipClick}
            isInfoTooltipOpen={isInfoTooltipOpen}
            closeAllPopups={closeTooltipPopup}
          />
          <ProtectedRoute
            path="/movies"
            component={Movies}
            authWindow={false}
            history={history}
            savedMovies={savedMovies}
            handleSetSavedMovies={setSavedMovies}
          />
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            authWindow={false}
            history={history}
            savedMovies={savedMovies}
            handleSetSavedMovies={setSavedMovies}
            savedMoviesShot={savedMoviesShot}
            handleSetSavedMoviesShot={setSavedMoviesShot}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
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
