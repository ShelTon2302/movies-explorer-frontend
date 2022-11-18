import './SearchForm.css';
import searchIcon from '../../images/search_icon.svg';

function SearchForm() {
    return (
        <section className="SearchForm">
            <form className="SearchForm__form">
                <img className="SearchForm__icon" src={searchIcon} alt="find"></img>
                <input 
                    type="text" 
                    placeholder="Фильм" 
                    className="SearchForm__input" 
                    required 
                />
                <button type="submit" className="SearchForm__button">Найти</button>
            </form>
            <label className="SearchForm__label">
                <input type="checkbox" className="SearchForm__checkbox"></input>
                <span className="SearchForm__newCheckbox"></span>
                <span className="SearchForm__newCheckboxText">Короткометражки</span>
            </label>
        </section>
    );
}

export default SearchForm;