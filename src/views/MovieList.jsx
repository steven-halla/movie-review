import React, { useEffect } from "react";
import {Link} from 'react-router-dom';
import {getAllMovies} from "../services/movie.service";

// ({ this is to return an object )}
// this gets our movies list from an url and returns the data to the user
export const MovieList = ({movies, setMovies}) => {
    useEffect(() => {
        getAllMovies()
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
                {/*this pulls from the movie_reviews model we still need to join both tables */}
                <li>
                    movie title: <p>{movie.title} {movie.id}</p>
                </li>

                <li>
                    Check out full stats <Link to={`movies/${movie.id}`}>Movie stats</Link>
                </li>

            </ul>
        </section>
    );
}

// once we get both tables connected, movie title should be turned into a link tag
// have the rating appear to the right of the title

