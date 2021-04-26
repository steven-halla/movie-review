import axios, {AxiosResponse} from "axios";
import {User, SignInRequest} from "model/User";
import {authHeader} from "./authHeader";


const API_URL = "http://localhost:7777";

// I took out display name from lines 6 and 8

// do I need to set rating/ reviews to something as a base?
export const signup = (email: string, password: string, displayName: string):  Promise<AxiosResponse<User>> => {
    return axios
        .post(API_URL + "/auth/signup", {
            // displayName,
            email,
            password,
            displayName
        })
};

// TODO signInRequest: SignInRequest
export const signin = (signInRequest: SignInRequest) => {
    return axios
        .post(API_URL + "/auth/signin", signInRequest, {headers: authHeader()})
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