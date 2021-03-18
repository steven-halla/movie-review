import React, {useState} from 'react';
import {history} from "../browserHistory";
import {useParams} from "react-router";
import {updateMovieReview} from "../services/movie.service";

// I am thinking I am passing user and movieId the wrong way
export const CreateReview = ({user}) => {
    const [rating, setRating] = useState("");

    const { id } = useParams();

    const formHandler = (event) => {
        event.preventDefault();

        if (!rating) {
            alert("Please select a rating");
        }

        updateMovieReview(id, rating).then(newReview => {
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
                    <input type="submit" name="rating" value="create review" onChange={formHandler} disabled={rating == null}/>
                </form>
            </div>
        </div>
    );
};