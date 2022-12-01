import './SearchForm.css';
import searchIcon from '../../images/search_icon.svg';
import React from 'react';

function SearchForm(props) {

    function handleSetCheckboxChecked (e) {
        props.setCheckboxStatus(e.target.checked);
    }

    return (
        <section className="SearchForm">
            <form className="SearchForm__form" onSubmit={props.onSubmit}>
                <img className="SearchForm__icon" src={searchIcon} alt="find"></img>
                <input 
                    type="text" 
                    placeholder="Фильм" 
                    className="SearchForm__input"
                    name="Search"
                    defaultValue={props.textReqSaved}
                    value={props.textReq}
                    onChange={props.setTextReq}
                    maxLength={30}
                    disabled={!props.enableForm}
                />
                <span className="SearchForm__input-error">{props.textReqErr}</span>
                <button 
                    type="submit" 
                    className="SearchForm__button"
                    disabled={!props.isValid && !props.enableForm}
                >Найти</button>
            </form>
            <label className="SearchForm__label">
                <input 
                    type="checkbox" 
                    className="SearchForm__checkbox" 
                    name="ShotMovie"
                    checked={props.checkboxStatus}
                    onChange={handleSetCheckboxChecked}
                    disabled={!props.enableForm}
                />
                <span className="SearchForm__newCheckbox"></span>
                <span className="SearchForm__newCheckboxText">Короткометражки</span>
            </label>
        </section>
    );
}

export default SearchForm;