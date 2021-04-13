import React, {useState, useEffect} from 'react';
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
import {LoginStateHandler} from './views/LoginStateHandler';


// change up home view

import './App.scss';
import {SignoutView} from "./views/SignoutView";
import {Header} from "./views/Header";
import {ProfileView} from "./views/ProfileView";
import {getCurrentUserAuth} from "./services/getCurrentUserAuth";
import {getUser} from "./services/user.service";
import {UserContextProvider} from "./services/user.context";
import {MovieContextProvider} from "./services/movie.context";


export const App = () => {
    // DELETE
    // Should I include email for this or make a seperate user for register?
    const [user, setUser] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [users, setUsers] = useState([]);

    const [movie, setMovie] = useState({
        title: "",
        rating: "",
        writtenReview: "",
    });

    //i put this in so that our critic list will display data

    const [movies, setMovies] = useState([]);

    // set user state with current logged in user, if needed
    useEffect(() => {
        const userAuth = getCurrentUserAuth();
        if (userAuth != null) {
            getUser(userAuth.id).then(authedUser => {
                // console.log(authedUser);
                setUser(authedUser.data);
            });
        }
    }, []);

    return (
        <UserContextProvider>
            <MovieContextProvider>
                <Router history={history}>
                    <div className="App">

                        <LoginStateHandler history={history}/>

                        <Header history={history}/>

                        <Switch>
                            <Route exact path="/signin">
                                <SigninView />
                            </Route>

                            <Route exact path="/signup">
                                <SignupView />
                            </Route>

                            <Route exact path="/signout">
                                <SignoutView />
                            </Route>

                            <Route exact path="/">
                                <HomeView />
                            </Route>

                            <Route exact path="/profile">
                                <ProfileView />
                            </Route>

                            <Route exact path="/movies">
                                <MovieList />
                            </Route>

                            <Route exact path="/movies/:id">
                                <MovieView  />
                            </Route>

                            <Route exact path="/movie/:id/review">
                                <CreateReview  />
                            </Route>

                            <Route exact path="/critics">
                                <CriticList />
                            </Route>

                            <Route exact path="/critics/:id">
                                <CriticView />
                            </Route>


                        </Switch>

                        {/*<footer />*/}
                    </div>
                </Router>
            </MovieContextProvider>
        </UserContextProvider>
    );
}
