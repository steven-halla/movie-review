import React, {useContext} from 'react';

import {Link} from "react-router-dom";
import {UserContext} from "../services/user.context";

export const ProfileView = () => {
    const { user } = useContext(UserContext);

    return (
        <div>
            <div className="loginbgcolor">
                <h1>Profile</h1>
            </div>
            <div>
                {/*user.email is just a temp thing will remove at the end */}
                <p>ID: {user.id}</p>
                <p>Name: {user.displayName}</p>
                <p>Email: {user.email}</p>
            </div>
            <br/>
            <Link className="link" to="/signout">Sign Out</Link>
        </div>
    );
};
