import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {
    return (
        <section className="MoviesCardList">
            <MoviesCard 
                nameRU='33 слова о дизайне'
                duration='1ч 42м'
                thumbnail='https://avatars.mds.yandex.net/i?id=046327b887c4015246bab3494ef293c1-4308223-images-thumbs&n=13'
                isLiked={true}
                
            />
            <button type="button" className="MoviesCardList__yetBtn" aria-label="Ещё">Ещё</button>
        </section>
    )
};

export default MoviesCardList;