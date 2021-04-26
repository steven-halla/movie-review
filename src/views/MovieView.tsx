import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router";
import {getMovie, getMovieReviews} from "services/movie.service";
import {Link} from 'react-router-dom';
import {MovieContext} from "services/movie.context";
import {Movie, MovieReview} from "model/Movie";
import {AxiosResponse} from "axios";
import styled from "styled-components";
import {Box, Button, Grid, Paper} from "@material-ui/core";
import {ViewHeader} from "./ViewHeader";

// import './MovieReview.scss';
const MovieViewDiv = styled.div`
  &.movie-view {
    max-width: 800px;
    margin: auto;

    .average-rating {
      font-size: 18px;
      font-weight: bold;
    }

    .leave-review-button {
      font-size: 18px;
    }

    .movie-reviews {
      .movie-review {
        &:hover {
          background-color: #eee;
        }
      }
    }
  }
`;

export const MovieView = () => {
    const {movie, setMovie} = useContext(MovieContext);

    // @ts-ignore
    const {id} = useParams();
    // const {userId} = useParams();

    const [reviews, setReviews] = useState<MovieReview[]>([]);

    useEffect(() => {
        getMovie(id)
            .then((response: AxiosResponse<Movie>) => {
                console.log(response.data);
                setMovie(response.data);
            });
    }, []);

    useEffect(() => {
        getMovieReviews(id)
            .then((response: AxiosResponse<MovieReview[]>) => {
                console.log(response.data);
                setReviews(response.data);
            });
    }, []);

    // this is an "expensive" computation, in future every time a user calls
    // PATCH /movies/{id}/review, we wil update review count and average review for
    // the movie so that the client doesn't have to calculate this
    const ratingSum: number = reviews
        .map((review: MovieReview) => review.rating) // map MovieReview[] to number[]
        .reduce((rating1: number, rating2: number) => rating1 + rating2, 0);

    // ternary operator, short-hand for 'if () {} else {}'
    const averageRating = reviews.length > 0
        ? (ratingSum / reviews.length)
        : 0;

    return (
        <MovieViewDiv className="movie-view">
            <ViewHeader text={movie?.title}/>

            <div className="average-rating">
                average rating: {averageRating} / 10
            </div>
            <Box m="10px">
                <Button
                    className="leave-review-button"
                    variant="contained"
                    color="primary"
                    href={`/movie/${id}/review`}
                >
                    Leave Review
                </Button>
            </Box>

            <Box className="movie-reviews">
                {reviews.map((review: MovieReview, i: number) => (
                    <Paper key={i} className="movie-review" elevation={3}>
                        <Link to={`/critics/${review.user.id}`}>
                            <strong>rating: {review.rating}</strong>
                            <p>review: {review.writtenReview}</p>
                            {review.user.displayName ? (
                                <p>by {review.user.displayName}</p>
                            ) : (
                                <p>by: anonymous</p>
                            )}
                        </Link>
                    </Paper>
                ))}
            </Box>
        </MovieViewDiv>

    );
};