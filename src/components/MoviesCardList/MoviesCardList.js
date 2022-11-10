import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
    let moreEnable;
    if (props.cards.length > 6) {
        moreEnable = false;
    } else {
        moreEnable=true;
    }
    return (
        <section className="MoviesCardList">
            {props.cards.map(item => <MoviesCard 
                        nameRU={item.nameRU}
                        duration={item.duration}
                        thumbnail={item.thumbnail}
                        isLiked={item.isLiked}
                        isSaved={props.isSaved}
                    />
                )}
            <button type="button" className={`MoviesCardList__yetBtn${moreEnable ? ' MoviesCardList__yetBtn_visibility_hidden' : ''}`} aria-label="Ещё">Ещё</button>
        </section>
    )
};

export default MoviesCardList;