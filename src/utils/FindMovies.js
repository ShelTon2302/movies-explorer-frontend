import { SHOT_DURATIOM } from '../const/const'

function FindMovies (props) {
    let find, message, isEnable;
    if (props.moviesList.length > 0) {
        find = props.moviesList.filter(function (item) {
            if (props.isShot) {
                return (
                    item.duration <= SHOT_DURATIOM);
            } else {
                return (
                    item.nameRU.toLowerCase().includes(props.textReg.toLowerCase())
                );
            }
        });    
    } else {
        find = [];
    }
    
    if (find.length === 0) {
        isEnable = false;
        message = 'Ничего не найдено';
    } else {
        isEnable = true;
    }

    return { find, message, isEnable };
};

export default FindMovies;