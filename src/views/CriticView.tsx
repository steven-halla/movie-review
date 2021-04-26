import React, {FC, useEffect, useState} from 'react';

import {useParams} from "react-router";
import {getUserProfile, getUserReviews} from "../services/user.service";
import {User, UserProfile} from "../model/User";
import {ViewHeader} from "./ViewHeader";


// on line 9 we pass in (prop) I'm going to delete it
export const CriticView: FC = () => {
    // descructuring on objects.

    // we get this info from the user ID (getUserProfile from userservices)
    // i had userprofle wrapped in curly bracers and had it changed to square brackets
    const [userProfile, setUserProfile] = useState<UserProfile>({} as UserProfile);

    let id: number;
    // @ts-ignore
    ({id} = useParams());

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
    //     mnuiv
    // }, []);

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
            <div>
                <ViewHeader text="Critic" />
                <ol>
                    {reviews.map(({movie, rating, writtenReview}) => {
                        // @ts-ignore
                        const {title} = movie;
                        return (
                            //currently this grabs movie ids that match with user id
                            <li>
                                <strong>Movie:{title}</strong>
                                <br/>
                                <strong>rating: {rating}</strong>
                                <br/>
                                <strong>written review: {writtenReview}</strong>
                            </li>
                        );
                    })}
                </ol>
                <div>
                    <p>ID: {userProfile.id}</p>
                    <p>Name: {userProfile.displayName}</p>


                </div>
            </div>
        );
    };
