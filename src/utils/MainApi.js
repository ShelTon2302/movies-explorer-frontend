class Api {
    constructor ( {baseUrl, headers} ) {
        this._UrlRegister = `${baseUrl}/signup`;
        this._UrlLogin = `${baseUrl}/signin`;
        this._UrlLogout = `${baseUrl}/signout`;
        this._UrlProfile = `${baseUrl}/users/me`;
        this._UrlAvatar = `${baseUrl}/users/me/avatar`;
        this._UrlMovies = `${baseUrl}/movies`;
        this._headers = headers;
    }

    _checkResponce(res) {
        try {
            if (res.status === 200 || res.status === 201){
                return res.json();
            }
        } 
        catch(e) {
            return (e)
        }
    }

    register(name, email, password) {
        return fetch(this._UrlRegister, {
            method: 'POST',
            mode: 'cors',
            headers: this._headers,
            body: JSON.stringify({name, email, password}),
            credentials: 'include'
            },)
            .then(this._checkResponce)
    }

    login(email, password) {
        return fetch(this._UrlLogin, {
            method: 'POST',
            mode: 'cors',
            headers: this._headers,
            body: JSON.stringify({email, password}),
            credentials: 'include'
            })
            .then(this._checkResponce)
    } 

    logout() {
        return fetch(this._UrlLogout, {
            method: 'POST',
            mode: 'cors',
            headers: this._headers,
            credentials: 'include'
        })
        .then(this._checkResponce)
    }

    getProfileInfo() {
        return fetch(this._UrlProfile, {
            method: 'GET',
            mode: 'cors',
            headers: this._headers,
            credentials: 'include'
        })
        .then(this._checkResponce)
    }

    setProfileInfo (email, name) {
        console.log(email.name);
        return fetch(this._UrlProfile, {
            method: 'PATCH',
            mode: 'cors',
            headers: this._headers,
            body: JSON.stringify({
                email,
                name
            }),
            credentials: 'include'
        })
        .then(this._checkResponce)
    }
    
    getSavedMovies() {
        return fetch(this._UrlMovies, {
            method: 'GET',
            mode: 'cors',
            headers: this._headers,
            credentials: 'include'
        })
        .then(this._checkResponce)
    }

    addMovie (Data) {
        return fetch(this._UrlMovies, {
            method: 'POST',
            mode: 'cors',
            headers: this._headers,
            body: JSON.stringify({
                country: Data.country,
                director: Data.director,
                duration: Data.duration,
                year: Data.year,
                description: Data.description,
                image: Data.image,
                trailerLink: Data.trailerLink,
                thumbnail: Data.thumbnail,
                movieId: Data.movieId,
                nameRU: Data.nameRU,
                nameEN: Data.nameEN,
            }),
            credentials: 'include'
        })
            .then(this._checkResponce)
    }

    deleteMovie (movieId) {
        return fetch(`${this._UrlMovies}/${movieId}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: this._headers,
            credentials: 'include'
        })
            .then(this._checkResponce)
    }
}

const api = new Api ({
    baseUrl: 'https://api.project-mesto.nomoredomains.icu',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
    });

export default api;

