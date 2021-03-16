import axios from 'axios';
import {authHeader} from "./authHeader";

const API_URL = `http://localhost:7777`;

export const getPublicMovies = () => {
    return axios.get(API_URL + `/movies`);
};

export const getPublicMovie = (movieId) => {
    return axios.get(API_URL + `/movies/${movieId}`);
};

export const createMovieReview = (movieId, rating) => {
    return axios.put(API_URL + `/movies/${movieId}`, {
        headers: authHeader(),
        data: {
            rating: rating
        }
    });
};

//maybe authHeader makes it to where the movie list can
//only be seen if you are logged in?
export const makeMovie = (movie) => {
    return axios.post( API_URL + `/movies`, {
        headers: authHeader(),
        data: movie
    });
};

