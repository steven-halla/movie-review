import axios from "axios";

const API_URL = "http://localhost:7777";

// I took out display name from lines 6 and 8

// do I need to set rating/ reviews to something as a base?
export const signup = (email, password, displayName) => {
    return axios
        .post(API_URL + "/auth/signup", {
            // displayName,
            email,
            password,
            displayName
        })
};

export const makeMovie = (title, rating) => {
    return axios
        .post(API_URL + "/movie/createmovie",{
            title,
            rating
        })
};

export const signin = (email, password) => {
    return axios
        .post(API_URL + "/auth/signin", {
            email,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                const userAuth = JSON.stringify(response.data);
                console.log(`userAuth: ${userAuth}`);
                localStorage.setItem("userAuth", userAuth);
            }
            return response.data
        });
};

export const signout = () => {
    localStorage.removeItem("userAuth");
}

export const isLoggedIn = () => {
    return localStorage.getItem("userAuth") != null;
}

//this might need to be put into our
// getCurrentUser() {
//     return JSON.parse(localStorage.getItem('user'));

//loging/reg uses methods from this file to make login/register request.