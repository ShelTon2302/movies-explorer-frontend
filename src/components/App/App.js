import './App.css';
import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from '../Main/Main';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import AuthForm from '../AuthForm/AuthForm';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Register from '../../Register/Register';

function App() {
  return (
    <section className="App">
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </section>
  );
}

export default App;
