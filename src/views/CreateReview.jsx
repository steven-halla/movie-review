import React, {useContext, useState} from 'react';
import {history} from "../browserHistory";
import {useParams} from "react-router";
import {updateMovieReview} from "../services/movie.service";
import {UserContext} from "../services/user.context";

// *** create react context check below for specific ***
//create user context


// ({user}) this lets us know what we are passing a user with its attributes
export const CreateReview = () => {
    const { user } = useContext(UserContext);
    const [rating, setRating] = useState("");

    const [writtenReview, setWrittenReview] = useState("");

    const { id: movieId } = useParams(); // rename url id to movie id

    const formHandler = (event) => {
        event.preventDefault();

        // check to force user to select a rating
        if (!rating) {
            alert("Please select a rating");
            return;
        }
        // if no user is logged in
        if (!user.id) {
            alert("Please login, user id is null");
            return;
        }

        // pass in review next to rating
        updateMovieReview(user.id, movieId, rating, writtenReview).then(newReview => {
            console.log("created movie review:")
            console.log(newReview);
            history.push("/");
        });
    };


    return (
        <div>
            <div className="loginbgcolor">
                <h1>Create Movie Review</h1>
            </div>
            <div>
                <p>Your rating of this movie:</p>
                <form onSubmit={formHandler}>

                    <select type="number" value={rating} onChange={(event) => setRating(event.target.value)}>
                        <option value="">Select Rating (1 low - 10 high)</option>
                        <option value="10">10</option>
                        <option value="9">9</option>
                        <option value="8">8</option>
                        <option value="7">7</option>
                        <option value="6">6</option>
                        <option value="5">5</option>
                        <option value="4">4</option>
                        <option value="3">3</option>
                        <option value="2">2</option>
                        <option value="1">1</option>
                    </select>
                    <br/>
                    <br/>

                    <textarea name="review" value={writtenReview} id="" cols="10" rows="5" onChange={(event) => setWrittenReview(event.target.value)}></textarea>
                    <br/>

                    <input type="submit" name="rating" value="create review" onChange={formHandler} disabled={rating == null}/>
                </form>
            </div>
        </div>
    );
};