import React, {useEffect} from 'react';
import {useParams} from "react-router";
import {getPublicMovie} from "../services/movie.service";
import {Link} from 'react-router-dom';

export const MovieView = (props) => {
    const {movie, setMovie} = props;
    const { id } = useParams();

    useEffect(() => {
        getPublicMovie(id)
            .then(response => {
                console.log(response.data);
                setMovie(response.data);
            });
    }, []);

    return (
        <div>
            <div className="loginbgcolor">
                <h1>Movie View</h1>
            </div>
            <div>
                <p>ID: {movie.id}</p>
                <p>Title: {movie.title}</p>
                <p>Rating Average: {movie.rating}</p>

                <p>Your rating of this movie:</p>
                Review This movie: <Link to={`/movie/${movie.id}/review`}>Review Movie</Link>

            </div>
        </div>
    );
};