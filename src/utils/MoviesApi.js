const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

export const getMovies = (() => {
    return fetch(BASE_URL, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        })
        .then((res) => {
            try {
                if (res.status === 200 || res.status === 201){
                    return res.json();
                }
            } 
            catch(e) {
                return (e)
            }    
        })
})