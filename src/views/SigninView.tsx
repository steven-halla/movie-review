import React, {useState, FC, ChangeEvent} from "react";
// import {isEmail} from "validator";
import {signin} from "../services/auth.service";
import {SignInRequest} from "../model/User";
import {Button, TextField} from "@material-ui/core";
import {RouteComponentProps} from "react-router";
import {withRouter} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import {Alert, AlertTitle} from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';


const required = (value: any) => {
    if (!value) {
        return (
            <div>
                <p>This field is required </p>
            </div>
        );
    }
};

const validEmail = (email: string) => {
    return true;
    // if (!isEmail(email)) {
    //     return (
    //         <div>
    //             <p>This is not a valid email</p>
    //         </div>
    //     );
    // }
};

const validPassword = (password: string) => {
    if (password.length < 8 || password.length > 20) {
        return (
            <div>
                <p>Password must be between 8 and 20 characters</p>
            </div>
        );
    }
};

// interface Props {
//     user: User;
//     setUser: (user: User) => void;
// }
// export const SigninView = props => { // same as with ()
export const RouterlessSigninView: FC<RouteComponentProps> = (props) => {
    const {history} = props;
    const [signInRequest, setSignInRequest] = useState<SignInRequest>({} as SignInRequest);

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setSignInRequest({
            ...signInRequest,
            email: event.target.value
        });

        if (!event.target.value) {
            setEmailError("");

        } else if (event.target.value.length < 2) {
            setEmailError("Email must be 2 + characters");

        } else {
            setEmailError("");
        }
    };

    const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setSignInRequest({
            ...signInRequest,
            password: event.target.value
        });

        if (!event.target.value) {
            setPasswordError("");

        } else if (event.target.value.length < 2) {
            setPasswordError("Password must be 2+ characters");

        } else {
            setPasswordError("");
        }
    };

// should I put CreateUserRequest from user.js?

    const handleSignIn = () => {
        setMessage("");
        setLoading(true);
        // validate all something is up with this one
        //form.current.validateAll();

        // console.log(signInRequest);

        signin(signInRequest).then(response => {
            // check response for error;
            history.push("/");
        }, (error: any) => {
            const errorMessage = parseErrorMessageFromErrorResponse(error);

            setLoading(false);
            setMessage(errorMessage);
        });
    }

    const parseErrorMessageFromErrorResponse = (error: any): string => {
        return (error.response && error.response.data && error.response.data.message)
            || error.message
            || error.toString()
    }

    return (
        <div>
            <div className="loginbox">
                {/* migrate away from onSubmit and forms and just have a button down blow with and onClick={handleSignin}*/}

                <div className="form-group">
                    <label htmlFor="email"> </label>
                    {/*value={email} we took this out from inline input tag*/}
                    <TextField id="outlined-basic" label="Email" variant="outlined" type="text" name="email"
                               onChange={onChangeEmail} className="form-control"
                        // validations={[required, validEmail]}

                    />
                    {emailError && (
                        <Alert severity="error">
                            <AlertTitle>{emailError} </AlertTitle>
                        </Alert>
                    )}

                </div>

                <div className="form-group">
                    <label htmlFor="password"> </label>
                    <TextField id="outlined-basic" label="password" variant="outlined" type="password" name="password"
                               className="form-control" onChange={onChangePassword}/>

                    {passwordError && (
                        <Alert severity="error">
                            <AlertTitle>{passwordError} </AlertTitle>
                        </Alert>
                    )}
                </div>

                <div className="form-group">
                    <Button variant="contained" color="primary" onClick={handleSignIn}
                            className="btn btn-primary btn-block" disabled={loading}>
                        {loading && (
                            <span className="spinner-border spinner-border-sm"/>
                        )}
                        <span>Sign In</span>
                    </Button>
                </div>

                {message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};

export const SigninView = withRouter(RouterlessSigninView);


//auth.services line 29 what type should signinrequest be?
//signinview lines 146 and 156 both havea  signin button, which should i keep?
//signinview unused parameters on handle signin line 92
