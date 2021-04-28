import React, {useContext, useEffect} from "react";
import {Link} from 'react-router-dom';
import {getAllMovies} from "../services/movie.service";
import {MovieContext} from "../services/movie.context";
import {ViewHeader} from "./ViewHeader";
import {Grid, Paper} from "@material-ui/core";
import styled from "styled-components";
import {Movie} from "../model/Movie";

const StyledMovieListDiv = styled.div`
  // & means "this"
  &.movie-list {
    max-width: 800px;
    margin: auto;

    .movies {
      .movie {
        height: 200px;

        .movie-paper {
          height: 100%;

          &:hover {
            background-color: #eee;
          }
        }
      }
    }
  }
`;

// ({ this is to return an object )}
// this gets our movies list from an url and returns the data to the user
export const MovieList = () => {
    const {movies, setMovies} = useContext(MovieContext);

    useEffect(() => {
        getAllMovies()
            .then(response => {
                // console.log("movies")
                // console.log(response.data);
                setMovies(response.data);
            })

    }, []);
    return (
        <StyledMovieListDiv className="movie-list">
            <ViewHeader text={"Movies"}/>
            <Grid container spacing={1} direction="row" className="movies">
                {movies.map((movie, index) => (
                    <MovieView key={index} movie={movie}/>
                ))}
            </Grid>
        </StyledMovieListDiv>
    );
};
//check postman lets change url to inlcude url
const MovieView = (props: { movie: Movie; }) => {
    const {movie} = props;

    return (
        <Grid item xs={12} sm={6} md={3} className="movie">
            <Link to={`movies/${movie.id}`}>
                <Paper elevation={3} className="movie-paper">
                    <div>
                        <h2>{movie.title}</h2>
                    </div>
                </Paper>
            </Link>
        </Grid>
    );
}

// once we get both tables connected, movie title should be turned into a link tag
// have the rating appear to the right of the title

