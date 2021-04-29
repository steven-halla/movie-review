import React, {FC, useContext, useState} from 'react';
import {RouteComponentProps, useParams} from "react-router";
import {updateMovieReview} from "services/movie.service";
import {UserContext} from "services/user.context";
import {withRouter} from "react-router-dom";
import {MovieReviewUpdateRequest} from "model/Movie";
import {User} from 'model/User';



interface CreateReviewParams {
    id: string;
}

const RouterlessCreateReview: FC<RouteComponentProps> = (props) => {
    const {history} = props;
    const {user} = useContext(UserContext);
    const [rating, setRating] = useState<number>();

    const [writtenReview, setWrittenReview] = useState("");

    const {id: movieIdString} = useParams<CreateReviewParams>(); // rename url id to movie id
    const movieId = Number(movieIdString);

    const onSubmit = () => {
        if (!user) {
            alert("no user logged in");
            return
        }

        const currentUser: User = user!;

        // check to force user to select a rating
        if (!rating) {
            alert("Please select a rating");
            return;
        }
        // if no user is logged in
        if (!currentUser.id) {
            alert("Please login, user id is null");
            return;
        }

        // pass in review next to rating
        const request: MovieReviewUpdateRequest = {
            userId: currentUser.id,
            movieId: movieId,
            rating: rating,
            writtenReview: writtenReview
        };
        updateMovieReview(request).then(newReview => {
            console.log("created movie review:")
            console.log(newReview);
            history.push(`/movies/${movieId}`);
        });
    };


    return (
        <div>
            <div>
                <p>Your rating of this movie:</p>

                <select value={rating} onChange={(event) => setRating(Number(event.target.value))}>
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

                <textarea name="review" value={writtenReview} id="" cols={10} rows={5}
                          onChange={(event) => setWrittenReview(event.target.value)}></textarea>
                <br/>

                <input type="submit" name="rating" value="create review" onClick={onSubmit}
                       disabled={rating == null}/>
            </div>
        </div>
    );
};

export const CreateReview = withRouter(RouterlessCreateReview);