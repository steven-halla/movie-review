import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {getMovie, getMovieReviews} from "../services/movie.service";
import {Link} from 'react-router-dom';
import {getUserProfile,getAllUsers, getUser} from "../services/user.service";


export const MovieView = (props) => {
    const {movie, setMovie} = props;
    const {user, setUser} = props;
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

    useEffect( () => {
        getAllUsers()
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
                                   <strong>{review.rating}</strong> - "{review.writtenReview}" - "{review.userId}"
                               </Link>
                            </li>


                        ))}
                    </ol>


                </p>

            </div>
        </div>
    );
};