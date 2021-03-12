import React, {useState} from 'react';
import axios from "axios";

import {signin, signup} from "../services/auth.service";
import {history} from "../browserHistory";
import {createUser} from "../services/user.service";


//line 5 i put props in round brackets
export const SignupView = (props) => {
    const {user, setUser} = props;

    const [emailError, setEmailError] = useState("");
    const [displayNameError, setDisplayNameError] = useState("");

    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    // not fully sure on how to read all of this
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

    const onChangeDisplayName = (event) => {
        onChange(event);
        if (!event.target.value) {
            setDisplayNameError("");

        } else if (event.target.value.length < 2) {
            setDisplayNameError("Email must be 2 + characters");

        } else {
            setDisplayNameError("");
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

    const onChangeConfirmPassword = (event) => {
        onChange(event);
        if (!event.target.value) {
            setConfirmPasswordError("");

        } else if (event.target.value !== user.password) {

        } else {
            setConfirmPasswordError("");
        }
        setUser({
            ...user,
            [event.target.name]: event.target.value,
        });
    };

    // const handleCreateUser = () => {
    //     // alert("don't forget to forward to user profile after creation!")
    //     createUser(user).then(response => {
    //         alert(JSON.stringify(response.data));
    //         setUser(response.data);
    //     });
    // };

    const handleSignup = () => {
        signup(user.email, user.password, user.displayName).then(response => {
            // check response for error;
            history.push("/signin");
        });
    }

    return (
        <div>

            <div className="loginbgcolor">
                <h1>Sign Up</h1>
            </div>

            <div className={"loginbox"}>


                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="text" name="email" onChange={onChangeEmail}/>
                    <p>{emailError}</p>
                </div>

                <div>
                    <label htmlFor="displayName">Display Name: </label>
                    <input type="text" name="displayName" onChange={onChangeDisplayName}/>
                    <p>{displayNameError}</p>
                </div>

                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" onChange={onChangePassword}/>
                    <p> {passwordError}</p>
                </div>

                <div>
                    {/*I might need to change confirm password in htmlFor and name to password if it breaks.*/}
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" name="confirmPassword" onChange={onChangeConfirmPassword}/>
                    <p>{confirmPasswordError}</p>
                </div>

                <button onClick={handleSignup}>
                    Create User
                </button>


            </div>
        </div>

    );
}
