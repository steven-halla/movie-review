import React, {useState, useRef} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {isEmail} from "validator";
import {signin} from "../services/auth.service";
import {history} from '../browserHistory';
// import {} from "../services/auth.service";
import {Link} from 'react-router-dom';
// import AuthService from "../services/auth.service";

const required = value => {
    if (!value) {
        return (
            <div>
                <p>This field is required </p>
            </div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div>
                <p>This is not a valid email</p>
            </div>
        );
    }
};

const validPassword = (value) => {
    if (value.length < 8 || value.length > 20) {
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
export const SigninView = (props) => {
    const {user, setUser} = props;

    const form = useRef();
    const checkBtn = useRef();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const [email, setEmail] = useState("");
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

    const handleSignin2 = (event) => {
        event.preventDefault();
        setMessage("");
        form.current.validateAll();

    }

    const handleSignin = (event) => {
        event.preventDefault();
        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            signin(user.email, user.password).then(response => {
                // check response for error;
                history.push("/");
            }, (error) => {
                const resMessage =
                    (error.response && error.response.date &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setLoading(false);
                setMessage(resMessage);
            });
        }

        // axios.get("http://localhost:7777/)", user);
    }

    return (
        <div>

            <div className="loginbgcolor">
                <h1>Sign In</h1>
            </div>

            <div className="loginbox">
                <Form onSubmit={handleSignin} ref={form}>
                    <div className="form-group">
                        <label htmlFor="email">Email: </label>
                        {/*value={email} we took this out from inline input tag*/}
                        <Input type="text" name="email" onChange={onChangeEmail} className="form-control"
                               validations={[required, validEmail]}/>
                        <p>{emailError}</p>
                    </div>

                    <div className="for/?m-group">
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" className="form-control" onChange={onChangePassword} r/>
                        <p> {passwordError}</p>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary btn-block" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Sign In</span>
                        </button>
                    </div>

                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{display: "none"}} ref={checkBtn}/>
                </Form>
            </div>
        </div>
    )

};


