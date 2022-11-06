import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css'

function Movies() {
    return (
        <div className="Movies">
            <Header />
            <SearchForm />
            <MoviesCardList />
        </div>
    );
};

export default Movies;