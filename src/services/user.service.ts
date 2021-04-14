import axios, {AxiosResponse} from 'axios';
import {CreateUserRequest, User, UserMovieReview, UserProfile} from 'model/User';
import {authHeader} from "./authHeader";


// should we delete api from the URL below?
const API_URL = `http://localhost:7777`;

export const createUser = (user: CreateUserRequest): Promise<AxiosResponse<User>> => {
    return axios.post(API_URL + '/users', user, {headers: authHeader()});
};

export const getUsers = (): Promise<AxiosResponse<User[]>> => {
    return axios.get(API_URL + `/users`, {headers: authHeader()});
};

export const getUser = (userId: number): Promise<AxiosResponse<User>> => {
    return axios.get(API_URL + `/users/${userId}`, {headers: authHeader()});
};


export const getUserProfile = (userId: number): Promise<AxiosResponse<UserProfile>> => {
    return axios.get(API_URL + `/users/${userId}/profile`);
};

//maybe i need to put a DB query here.
export const getUserReviews = (userId: number): Promise<AxiosResponse<UserMovieReview[]>> => {
    return axios.get(API_URL + `/users/${userId}/reviews`);
};


// we won't add types to these yet since they are just for test/demo
export const getPublicContent = () => {
    return axios.get(API_URL + "/api/test/all");
};

export const getUserBoard = () => {
    return axios.get(API_URL + "/api/test/user", {headers: authHeader()});
};

export const getModeratorBoard = () => {
    return axios.get(API_URL + "/api/test/mod", {headers: authHeader()});
};

export const getAdminBoard = () => {
    return axios.get(API_URL + "/api/test/admin", {headers: authHeader()});
};