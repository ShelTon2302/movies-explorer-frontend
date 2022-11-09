import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';

function SavedMovies() {
    const loadingMovies = true

    return (
        <div className="SavedMovies">
            <Header />
            <SearchForm />
            {loadingMovies 
                ? 
                    <Preloader /> 
                : 
                    <MoviesCardList />
            }
            <Footer />
        </div>
    )
};

export default SavedMovies;