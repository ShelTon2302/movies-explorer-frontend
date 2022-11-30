function FindMovies (moviesList, textReq, setFind, setFindShot, setTextMessage, setTextMessageShot, setIsMovies, setIsMoviesShot) {
    console.log()
    let find = moviesList.filter(function (item) {
        return (
            item.nameRU.toLowerCase().includes(textReq.toLowerCase()) 
        );
    });
    
    if (find.length === 0) {
        setIsMovies(false);
        setIsMoviesShot(false);
        setTextMessage('Ничего не найдено')
        setTextMessageShot('Ничего не найдено')
    } else {
        setFind(find);
        console.log('find', find)
        setIsMovies(true);
        let findShot = find.filter(function (item) {
            return (
                item.duration <= 40 
            );
        });
        if (find.length === 0) {
            setIsMoviesShot(false);
            setTextMessageShot('Ничего не найдено')
        } else {
            setFindShot(findShot);
            setIsMoviesShot(true);
        }
    }
    localStorage.setItem('findedMovies', JSON.stringify(find));
    

};


export default FindMovies