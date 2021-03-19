import axios from 'axios';
import {authHeader} from "./authHeader";

const API_URL = `http://localhost:7777`;

export const getMovies = () => {
    return axios.get(API_URL + `/movies`);
};

export const getMovie = (movieId) => {
    return axios.get(API_URL + `/movies/${movieId}`);
};

export const updateMovie = (movie) => {
    return axios.put(API_URL + `/movies/${movie.id}`, movie, {headers: authHeader()});
};

export const makeMovie = (movie) => {
    return axios.post( API_URL + `/movies`, movie, {headers: authHeader()});
};

export const updateMovieReview = (userId, movieId, rating) => {
    const requestBody = {
        userId: userId,
        rating: rating
    };
    return axios.patch(API_URL + `/movies/${movieId}/review`, requestBody, {headers: authHeader()});
};




