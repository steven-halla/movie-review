import React, {FC, useContext, useEffect, useState} from 'react';

import {useParams} from "react-router";
import {getUserProfile, getUserReviews} from "../services/user.service";
import {UserProfile} from "../model/User";
import {Box, Paper, Button, FormControl} from "@material-ui/core";
import styled from "styled-components";
import {deleteMovieReview, getAllMovies, getMovie} from "../services/movie.service";
import {MovieContext} from "../services/movie.context";
import {Movie, MovieReview, MovieReviewUpdateRequest} from "../model/Movie";
import {AxiosResponse} from "axios";


const CriticViewDiv = styled.div`
  &.critic-view {
    max-width: 800px;
    margin: auto;
    background-color: #eeeeee;

    .written-review {
      color: red;
      padding-bottom: 10px;
      margin-bottom: 10px;
      padding-left: 10px;
      margin-left: 10px;
    }

    .critic-header-name {
      font-family: "Avenir Next Condensed", serif;
      font-size: xx-large;
      color: green;
      padding-bottom: 10px;
      margin-bottom: 10px;
      padding-left: 10px;
      margin-left: 10px;
    }

    .critic-review-list {
      margin: 10px;
    }


  }
`;

interface CreateReviewParams {
  id: string;
}


// on line 9 we pass in (prop) I'm going to delete it
export const CriticView: FC = () => {
    // descructuring on objects.

    // we get this info from the user ID (getUserProfile from userservices)
    // i had userprofle wrapped in curly bracers and had it changed to square brackets
    const [userProfile, setUserProfile] = useState<UserProfile>({} as UserProfile);
    const {movie, setMovie} = useContext(MovieContext);

    let id: number;
    // @ts-ignore
    ({id} = useParams());

  const {id: movieReviewString} = useParams<CreateReviewParams>(); // rename url id to movie id


  const [reviews, setReviews] = useState([]);
  const movieReviewId = Number(movieReviewString);



  // useEffect(() => {
  //   deleteMovieReview(id)
  //     .then((response: AxiosResponse<MovieReviewUpdateRequest>) => {
  //       console.log(response.data);
  //       setReviews(response.data);
  //     });
  // }, []);


  // useEffect(() => {
  //   deleteMovieReview(id)
  //     .then( response => {
  //       console.log(response.data);
  //       setReviews(response.data);
  //     });
  // }, []);

  // useEffect(() => {
  //   deleteMovieReview(movieReviewId)
  //     .then(response => {
  //       console.log(response.data);
  //       setReviews(response.data);
  //     })
  //
  // }, []);




    useEffect(() => {
        getUserProfile(id)
            .then(response => {
                setUserProfile(response.data);
            });
    }, []);

    useEffect(() => {
        getMovie(id)
            .then(response => {
                console.log(response.data);
                setMovie(response.data);
            });

    }, []);



    useEffect(() => {
        getUserReviews(id)
            .then(response => {
                console.log(response.data);
                // @ts-ignore
                setReviews(response.data);
            });
    }, []);

    // getUserReviews
    // /users/id/reviews


    return (
        <CriticViewDiv className="critic-view">
            <Box className="critic-header-name">
                <p> {userProfile.displayName}</p>
            </Box>
            <Box className="critic-reviews">
                {reviews.map((review: MovieReview) => {
                    return (
                        //currently this grabs movie ids that match with user id
                        <Paper className="critic-review-list" elevation={11}>
                            <li>
                                <strong>Movie:{review.movie.title}</strong>
                                <br/>
                                <br/>
                                <strong>My rating: {review.rating}</strong>
                                <br/>
                                <br/>
                                <strong className="written-review">My written review: {review.writtenReview}</strong>
                                <br/>
                                <br/>
                                <FormControl>
                                  <Button
                                    className="delete-button"
                                    variant="contained"
                                    // onClick={deleteMovieReview}
                                  >
                                    Delete Review
                                  </Button>

                                </FormControl>

                            </li>
                        </Paper>

                    );
                })}
            </Box>
        </CriticViewDiv>
    );
};
