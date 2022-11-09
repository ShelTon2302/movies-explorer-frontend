import React from 'react';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css'
import Footer from '../Footer/Footer';

function Movies() {
    const loadingMovies = false
    return (
        <div className="Movies">
            <Header />
            <SearchForm />
            {loadingMovies ? <Preloader /> : <MoviesCardList />}
            <Footer />
        </div>
    );
};

export default Movies;