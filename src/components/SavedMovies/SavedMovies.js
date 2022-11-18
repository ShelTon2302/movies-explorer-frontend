import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import savedcards from '../../const/savedcards';

function SavedMovies() {
    const loadingMovies = false

    return (
        <div className="SavedMovies">
            <Header />
            <SearchForm />
            {loadingMovies 
                ? 
                    <Preloader /> 
                : 
                    <MoviesCardList 
                        cards={savedcards}
                        isSaved={true}
                    />
            }
            <Footer />
        </div>
    )
};

export default SavedMovies;