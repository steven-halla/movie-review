import React, {useState} from 'react';
import axios from "axios";
import {history} from "../browserHistory";

export const CreateReview = ({user, setUser}) => {
    const [rating, setRating] = useState("");

    const formHandler = (event) => {
        event.preventDefault();

        const newReview = {
            rating: rating
        };
        // should this be a post, or update? I'm thinking UPdate as we are not creating
        //something new
        axios.patch(`http://localhost:7777/movies`, newReview)
            .then((res) => {
                console.log(res);
                history.push("/movielist");
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
                    {/*I think I need to pass in a user here*/}
                    <select type="number" value={rating} onChange={(event) => setRating(event.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                    <input type="submit" value="create review"/>
                </form>
            </div>
        </div>
    );
};