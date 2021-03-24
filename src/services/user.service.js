import axios from 'axios';
import {authHeader} from "./authHeader";


// should we delete api from the URL below?
const API_URL = `http://localhost:7777`;

export const getAllUsers = () => {
    return axios.get(API_URL + `/users`)
};


export const createUser = (user) => {
    return axios.post(API_URL + '/users', user, {headers: authHeader()});
};

export const getUsers = () => {
    return axios.get(API_URL + `/users`, {headers: authHeader()});
};

export const getUser = (userId) => {
    return axios.get(API_URL + `/users/${userId}`, {headers: authHeader()});
};



export const getUserProfile = (userId) => {
    return axios.get(API_URL + `/users/${userId}/profile`);
};

export const getUserReviews = (userId) => {
    return axios.get(API_URL + `/users/${userId}/reviews`);
};











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