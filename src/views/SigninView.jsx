import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";
import {Link} from 'react-router-dom';

import {signin} from "../services/auth.service";
import {history} from '../browserHistory';

// import AuthService from "../services/auth.service";



export const SigninView = props => {

    const required = (props) => {
        if (!props) {
            return(
                <div className="alert-danger" role="alert">
                    <p>This Field is required</p>
                </div>
            )
        }
    }
    const {user, setUser} = props;

    const form =
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const onChange = event => {
        console.log('event.target.value =', event.target.value)
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    };

    const onChangeEmail = (event) => {
        onChange(event);
        if (!event.target.value) {
            setEmailError("");

        } else if (event.target.value.length < 2) {
            setEmailError("Email must be 2 + characters");

        } else {
            setEmailError("");
        }
    };

    const onChangePassword = (event) => {
        onChange(event);
        if (!event.target.value) {
            setPasswordError("");

        } else if (event.target.value.length < 2) {
            setPasswordError("Password must be 2+ characters");

        } else {
            setPasswordError("");
        }
    };

    const handleSignin = () => {
        signin(user.email, user.password).then(response => {
            // check response for error;
            history.push("/");
        });

        // axios.get("http://localhost:7777/)", user);
    };

    return (
        <div>
            <div className="loginbgcolor">
                <h1>Sign In</h1>
            </div>

            <div className="loginbox">
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="text" name="email" onChange={onChangeEmail}/>
                    <p>{emailError}</p>
                </div>

                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" onChange={onChangePassword}/>
                    <p> {passwordError}</p>
                </div>

                <button onClick={handleSignin}>
                    Sign In
                </button>
            </div>
        </div>
    );
    return(
        <div className="alert-danger" role="alert">
            <p>This Field is required</p>
        </div>
    )
}
