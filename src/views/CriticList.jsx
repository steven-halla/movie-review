import React, {useEffect} from "react";
import {Link} from 'react-router-dom';
import {getUsers} from "../services/user.service";

export const CriticList = ({users, setUsers}) => {

    useEffect(() => {
        getUsers()
            .then(response => {
                setUsers(response.data);
            });

    }, []);
    return (
        <div>
            <div className="loginbgcolor">
                <h1>Critic List</h1>
            </div>
            <div>
                {users.map((user, index) => (
                    <CriticUser key={index} user={user}/>
                ))}

            </div>
        </div>

    );
};

const CriticUser = ({user}) => {
    return (
        <section>
            <ul>

                <li>
                    user name: <p>{user.displayName}</p>
                </li>

                <li>
                    profile: <Link to={`/critics/${user.id}`}>View Profile</Link>
                </li>

                <li>
                    id :<p>{user.id}</p>
                </li>

            </ul>
        </section>
    );
}