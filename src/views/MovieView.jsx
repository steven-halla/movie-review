import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router";
import {getMovie, getMovieReviews} from "../services/movie.service";
import {Link} from 'react-router-dom';
import {getUsers} from "../services/user.service";
import {UserContext} from "../services/user.context";
import {MovieContext} from "../services/movie.context";


export const MovieView = () => {
    const {movie, setMovie} = useContext(MovieContext);

    const {setUser} = useContext(UserContext);
    const {id} = useParams();
    const {userId} = useParams();

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        getMovie(id)
            .then(response => {
                console.log(response.data);
                setMovie(response.data);
            });
    }, []);

    useEffect(() => {
        getMovieReviews(id)
            .then(response => {
                console.log(response.data);
                setReviews(response.data);
            });
    }, []);

    useEffect(() => {
        getUsers()
            .then(response => {
                console.log(response.data);
                setUser(response.data);
            });
    }, []);

    return (
        <div>
            <div className="loginbgcolor">
                <h1>Movie View</h1>
            </div>
            <div>

                <Link to={`/movie/${movie.id}/review`}>Review Movie</Link>

                <p>
                    <strong>Ratings</strong>
                    <ol>
                        {reviews.map(review => (
                            <li>
                                <Link to={`/critics/${review.id}`}>
                                    <strong>movie rating:{review.rating}</strong> - writtenReview:
                                    "{review.writtenReview}" name of reviewer: {review.user.displayName}
                                </Link>
                            </li>


                        ))}
                    </ol>


                </p>

            </div>
        </div>
    );
};