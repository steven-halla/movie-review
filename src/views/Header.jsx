import React, {useEffect} from 'react';

//make header for main page first thing i am sure that is what kenny meant either way it needs to be built.
// I can make a logged in header and a logged out header?

import {isLoggedIn} from "../services/auth.service";
import {Link} from "react-router-dom";


import "./Header.scss";

export const Header = (props) => {
    const {user, history} = props;

    // const path = history.location.pathname;


    if (isLoggedIn() && user != null) {
        return (
            <div className="top-header">
                <div className="links">
                    <Link className="link" to="/critics">Critics</Link>
                    <Link className="link" to="/movies">Movies</Link>
                    <Link className="link" to="/">Home</Link>
                    <Link className={"link"} to="/profile">
                        {user.displayName || user.email || 'Profile'}
                    </Link>
                </div>

            </div>
        );
    }
    return (
        <div className="top-header">
            <div className="links">
                <Link className="link" to={"/signin"}>Sign In</Link>
                <Link className="link" to={"/signup"}>Sign Up</Link>
            </div>
        </div>
    )
}

