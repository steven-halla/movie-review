import React, {useContext, useEffect, useState} from 'react';

import {useParams} from "react-router";
import {getUserProfile, getUserReviews} from "../services/user.service";

import {UserContext} from "../services/user.context";

export const CriticView = (props) => {
    // descructuring on objects.
    const { userProfile, setUserProfile } = useState({});

    const {id} = useParams();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        getUserProfile(id)
            .then(response => {
                setUserProfile(response.data);
            });
    }, []);

    // useEffect( () => {
    //     getMovie(id)
    //         .then(response => {
    //             console.log(response.data);
    //             setMovie(response.data);
    //         });
    //
    // }, []);

    useEffect( () => {
        getUserReviews(id)
            .then(response => {
                console.log(response.data);
                setReviews(response.data);
            });
    }, []);

    // getUserReviews
    // /users/id/reviews

    return (
        <div>
            <div className="loginbgcolor">
                <h1>Critic</h1>
            </div>
            <ol>
                {reviews.map(review => (
                    //currently this grabs movie ids that match with user id
                    <li>
                        <strong>Movie:{review.movie.title}</strong>
                        <br/>
                        <strong>rating: {review.rating}</strong>
                        <br/>
                        <strong>written review: {review.writtenReview}</strong>
                    </li>
                ))}
            </ol>
            <div>
                <p>ID: {userProfile.id}</p>
                <p>Name: {userProfile.displayName}</p>


            </div>
        </div>
    );
};
