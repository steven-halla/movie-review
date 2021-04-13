import React, {useContext, useEffect} from "react";
import {Link} from 'react-router-dom';
import {getUsers} from "../services/user.service";
import {UserContext} from "../services/user.context";

// we are not making adds/deletes to he list, therefore we will set our list to a key named index ( the index of the item)
// if we add/delete items  then index would not work. In that case we would need the item id number.

export const CriticList = () => {
    const { users, setUsers } = useContext(UserContext);

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