const FindMovies = ((moviesList, checkboxState, textReq) => {
    let find = [];
    if (checkboxState) {
        find = moviesList.filter(function (item) {
                return (
                    item.nameRU.toLowerCase().includes(textReq) 
                        && 
                    item.duration < 41);
        });
    } else {
        find = moviesList.filter(function (item) {
            return (
                item.nameRU.toLowerCase().includes(textReq) 
            );
    });
    }
    return find
})

export default FindMovies