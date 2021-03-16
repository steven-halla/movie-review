import React, { useEffect } from "react";
import {Link} from 'react-router-dom';
import {getPublicMovies} from "../services/movie.service";

// ({ this is to return an object )}
export const MovieList = ({movies, setMovies}) => {
    useEffect(() => {
        getPublicMovies()
            .then(response => {
                console.log(response.data);
                setMovies(response.data);
            })

    }, []);

    return (
        <div>
            <div className="loginbgcolor">
                <h1>Movies</h1>
            </div>
            <div>
                {movies.map((movie, index) => (
                    <SelectedMovie key={index} movie={movie} />
                ))}
            </div>
        </div>

    );
};

const SelectedMovie = ({movie}) => {
    return(
        <section>
            <ul>

                <li>
                    movie title: <p>{movie.title}</p>
                </li>

                <li>
                    average rating: <p>{movie.rating}</p>
                </li>

                <li>
                    Check out full stats <Link to={`movies/${movie.id}`}>Movie stats</Link>
                </li>

            </ul>
        </section>
    );
}