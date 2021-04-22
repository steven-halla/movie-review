import axios from 'axios';
import {authHeader} from "./authHeader";

const API_URL = `http://localhost:7777`;


//i passed in user may need to delete this includes headers/auth headers

export const getAllMovies = () => {
    return axios.get(API_URL + `/movies`, {headers: authHeader()});
};

export const getMovie = (movieId: any) => {
    return axios.get(API_URL + `/movies/${movieId}`, {headers: authHeader()});
};

export const updateMovie = (movie: { id: any; }) => {
    return axios.put(API_URL + `/movies/${movie.id}`, movie, {headers: authHeader()});
};

export const makeMovie = (movie: any) => {
    return axios.post( API_URL + `/movies`, movie, {headers: authHeader()});
};

//we pass in movieId but never use it I wonder if I can delete it from line 24.
// pass in review on line 24
export const updateMovieReview = (userId: number, movieId: any, rating: string, writtenReview: string) => {
    const requestBody = {
        userId: userId,
        rating: rating,
        writtenReview: writtenReview
    };
    return axios.patch(API_URL + `/movies/${movieId}/reviews`, requestBody, {headers: authHeader()});
};

export const getMovieReviews = (movieId: any) => {
    return axios.get(API_URL + `/movies/${movieId}/reviews`);
};
