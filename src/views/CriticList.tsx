import React, {FC, useContext, useEffect} from "react";
import {Link} from 'react-router-dom';
import {getUsers} from "../services/user.service";
import {UserContext} from "../services/user.context";
import {AxiosResponse} from "axios";
import {User} from "../model/User";
import {Box, Paper} from "@material-ui/core";
import styled from "styled-components";

// we are not making adds/deletes to he list, therefore we will set our list to a key named index ( the index of the item)
// if we add/delete items  then index would not work. In that case we would need the item id number.


const CriticListDiv = styled.div`
    &.critic-view {
      max-width: 800px;
      margin: auto;
      background-color: #eeeeee;
    }
  
  .critic-list {
    margin: 10px;

  }
  
  ul li {
    margin: auto;
    list-style-type:none;
    color: red;
    margin-right: 37px;
  }

`;

export const CriticList: FC = () => {
    const { users, setUsers } = useContext(UserContext);

    useEffect(() => {
        getUsers()
            .then((response: AxiosResponse<User[]>) => {
                setUsers(response.data);
            });

    }, []);

    return (
        <CriticListDiv className="critic-view">

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
        </CriticListDiv>


    );
};

interface CriticUserProps {
    user: User;
}
// FC<CriticsUserProps> <-- this is called "generics", google "typescript basic generics" "what is generics"
const CriticUser: FC<CriticUserProps> = (props) => {
    const { user } = props;
    return (

        <CriticListDiv className="critic-view">
            <Paper className="critic-list">
                <section>
                    <ul>

                        <li>
                            <p>{user.displayName}</p>
                        </li>

                        <li>
                            <Link to={`/critics/${user.id}`}>View Profile</Link>
                        </li>



                    </ul>
                </section>
            </Paper>

        </CriticListDiv>

    );
}