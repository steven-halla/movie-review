import React, {FC, useContext} from 'react';

import {Link} from "react-router-dom";
import {UserContext} from "../services/user.context";

import styled from "styled-components";
import {Box, Typography, Grid, Paper} from "@material-ui/core";

const ProfileViewDiv = styled.div`
    &.profile-user-view{
      max-width: 800px;
      margin: auto;
    }
  
  .user-info {
    color: red;
  }
  
  .link {
    margin: auto;
    color: blue;
    display: block;
    width: 115px;
    height: 25px;
    background: #4E9CAF;
    padding: 10px;
    text-align: center;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    line-height: 25px;
  }
`;


export const ProfileView: FC = () => {
    // @ts-ignore
    const { user: {displayName, email} } = useContext(UserContext);

    return (
        <ProfileViewDiv className="profile-user-view">
            <div>
                <div className="loginbgcolor">
                    <h1>Profile</h1>
                </div>
                <Box className="user-info">
                    {/*user.email is just a temp thing will remove at the end */}
                    <p>Name: {displayName}</p>
                    <p>Email: {email}</p>
                </Box>
                <br/>
                <Typography className="link" variant="button">
                    <Link  to="/signout">Sign Out</Link>
                </Typography>
            </div>
        </ProfileViewDiv>

    );
};
