import React, {ChangeEvent, FC, useContext, useState} from 'react';
import {signup} from "../services/auth.service";
import {history} from "../browserHistory";
import {UserContext} from "../services/user.context";
import {Box, Input, Paper, TextField, Button} from "@material-ui/core";
import styled from "styled-components";

const SignUpViewDiv = styled.div `


  &.signupbox {
    background-color: #eeeeee;
    width: 400px;

    padding: 10px;
    border-radius: 25px;
    color: red;
    max-width: 800px;
    margin: auto;
    

    
  }
  

  .email-input {
    margin-right: auto;
    color: blue;
  }
  
  .page-wrap {
    background-color: #282c34;
  }
    
    
    
    
    
`;






export const SignupView = () => {
    const {user, setUser} = useContext(UserContext);

    const [emailError, setEmailError] = useState("");
    const [displayNameError, setDisplayNameError] = useState("");

    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    // not fully sure on how to read all of this
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log('event.target.value =', event.target.value)
        // @ts-ignore
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    };

    const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event);
        if (!event.target.value) {
            setEmailError("");

        } else if (event.target.value.length < 2) {
            setEmailError("Email must be 2 + characters");

        } else {
            setEmailError("");
        }
    };

    const onChangeDisplayName = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event);
        if (!event.target.value) {
            setDisplayNameError("");

        } else if (event.target.value.length < 2) {
            setDisplayNameError("Email must be 2 + characters");

        } else {
            setDisplayNameError("");
        }
    };

    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event);
        if (!event.target.value) {
            setPasswordError("");

        } else if (event.target.value.length < 2) {
            setPasswordError("Password must be 2+ characters");

        } else {
            setPasswordError("");
        }
    };

    const onChangeConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event);
        if (!event.target.value) {
            setConfirmPasswordError("");

        } else { // @ts-ignore
            if (event.target.value !== user.password) {

                    } else {
                        setConfirmPasswordError("");
                    }
        }
        // @ts-ignore
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
        // @ts-ignore
        signup(user.email, user.password, user.displayName).then(response => {
            // check response for error;
            history.push("/signin");
        });
    }

    return (

        <Box className="page-wrap">

            <div className="loginbgcolor">
                <h1>Sign Up</h1>
            </div>
            <SignUpViewDiv className="signupbox">
                <Box>


                    <Box className="email-input">
                        <label htmlFor="email"> </label>
                        <TextField id="outlined-basic" label="Email" variant="outlined" type="text" name="email" onChange={onChangeEmail}/>
                        <p>{emailError}</p>
                    </Box>

                    <Box>
                        <label htmlFor="displayName"> </label>
                        <TextField id="outlined-basic" label="DisplayName" variant="outlined"type="text" name="displayName" onChange={onChangeDisplayName}/>
                        <p>{displayNameError}</p>
                    </Box>

                    <Box>
                        <label htmlFor="password"> </label>
                        <TextField id="outlined-basic" label="Password" variant="outlined"type="password" name="password" onChange={onChangePassword}/>
                        <p> {passwordError}</p>
                    </Box>

                    <Box>
                        {/*I might need to change confirm password in htmlFor and name to password if it breaks.*/}
                        <label htmlFor="confirmPassword"></label>
                        <TextField id="outlined-basic" label="Confirm Password" variant="outlined"type="password" name="confirmPassword" onChange={onChangeConfirmPassword}/>
                        <p>{confirmPasswordError}</p>
                    </Box>

                    <Button variant="contained" color="primary" onClick={handleSignup}>
                        Create User
                    </Button>


                </Box>
            </SignUpViewDiv>
        </Box>

    );
}
