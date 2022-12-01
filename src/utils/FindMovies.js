import { SHOT_DURATIOM } from '../const/const'

function FindMovies (moviesList, textReq, setFind, setFindShot, setTextMessage, setTextMessageShot, setIsMovies, setIsMoviesShot) {
    let find, findShot
    
    find = moviesList.filter(function (item) {
        return (
            item.nameRU.toLowerCase().includes(textReq.toLowerCase()) 
        );
    });
    
    if (find.length === 0) {
        setIsMovies(false);
        setTextMessage('Ничего не найдено')
        setTextMessageShot('Ничего не найдено')
    } else {
        setFind(find);
        setIsMovies(true);
        findShot = find.filter(function (item) {
            return (
                item.duration <= SHOT_DURATIOM 
            );
        });
        if (findShot.length === 0) {
            setIsMoviesShot(false);
            setTextMessageShot('Ничего не найдено')
        } else {
            setFindShot(findShot);
            setIsMoviesShot(true);
        }
    }
};

export default FindMovies