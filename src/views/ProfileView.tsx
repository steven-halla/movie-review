import React, {FC, useContext} from 'react';

import {Link} from "react-router-dom";
import {UserContext} from "../services/user.context";

import styled from "styled-components";
import {Box, Typography} from "@material-ui/core";

const ProfileViewDiv = styled.div`
  &.profile-user-view {
    max-width: 800px;
    margin: auto;
  }

  .user-info {
    color: red;
  }

  .link {
    margin: auto;
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
    const {user} = useContext(UserContext);

    return (
        <ProfileViewDiv className="profile-user-view">
            <Box className="user-info" mb="15px">
                {/*user.email is just a temp thing will remove at the end */}
                <p>Name: {user?.displayName}</p>
                <p>Email: {user?.email}</p>
            </Box>
            <Typography className="link" variant="button">
                <Link to="/signout">Sign Out</Link>
            </Typography>
        </ProfileViewDiv>
    );
};
