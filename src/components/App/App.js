import './App.css';
import React from "react";
import { Route, Switch } from "react-router-dom";
import MainPage from '../MainPage/MainPage';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import AuthForm from '../AuthForm/AuthForm';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';

function App() {
  return (
    <section className="App">
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path="/signin">
          <AuthForm 
            title='Рады видеть!'
            buttonText='Войти'
            text='Ещё не зарегистрированы?'
            link='/signup'
            linkText='Регистрация'
          />
        </Route>
        <Route path="/signup">
          <AuthForm
            title='Добро пожаловать!'
            buttonText='Зарегистрироваться'
            text='Уже зарегистрированы?'
            link='/signin'
            linkText='Войти'
          >
            <p className="AuthForm__inputName">Имя</p>
            <input 
                type="text" 
                defaultValue="Виталий" 
                className="AuthForm__input" 
                required 
            />
          </AuthForm> 
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
