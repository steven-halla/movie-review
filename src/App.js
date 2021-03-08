import React, {useState} from 'react';
import {Route, Router, Switch} from "react-router";
import {history} from './browserHistory';
import {SigninView} from './views/SigninView';
import {SignupView} from './views/SignupView';
import {HomeView} from "./views/HomeView";
import {CriticList} from './views/CriticList';
import {CriticView} from './views/CriticView';
import {MovieList} from './views/MovieList';
import {MovieView} from './views/MovieView';
import {CreateReview} from './views/CreateReview';


// change up home view

import './App.scss';
import {SignoutView} from "./views/SignoutView";


export const App = () => {

    // Should I include email for this or make a seperate user for register?

    const [user, setUser] = useState({
        userName: "",
        email:"",
        password: "",
        confirmPassword: "",
    });

    const [movie, setMovie] = useState( {
        title: "",
        rating: "",
    });

    //i put this in so that our critic list will display data
    const[users, setUsers] = useState([]);
    const[movies, setMovies] = useState([]);



    return (
        <div className="App">

            {/*<header />*/}

            <Router history={history}>
                <Switch>
                    <Route exact path="/signin">
                        <SigninView user={user} setUser={setUser} />
                    </Route>

                    <Route exact path="/signup">
                        <SignupView user={user} setUser={setUser}/>
                    </Route>

                    <Route exact path="/signout">
                        <SignoutView />
                    </Route>

                    <Route exact path="/">
                        <HomeView user={user} setUser={setUser} />
                    </Route>

                    <Route exact path="/movielist">
                        <MovieList movies={movies} setMovies={setMovies}/>
                    </Route>

                    <Route exact path="/movies/:id">
                        <MovieView movie={movie} setMovie={setMovie}/>
                    </Route>

                    <Route exact path="/criticlist">
                        <CriticList users={users} setUsers={setUsers}/>
                    </Route>

                    <Route exact path="/critics/:id">
                        <CriticView user={user} setUser={setUser} />
                    </Route>

                    <Route exact path="/critic/movie/:id">
                        <CreateReview user={user} setUser={setUser} movie={movie} setMovie={setMovie} />
                    </Route>

                </Switch>
                {/*<Home path="/"  />*/}
                {/*<CriticView path="/critic" />*/}
                {/*<Login path="/login" />*/}
                {/*<MovieView path="/movie"/>*/}
                {/*<Register path="/register"/>*/}

            </Router>

            {/*<footer />*/}
        </div>
    );
}

export default App;