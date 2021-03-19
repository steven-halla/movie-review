import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {getUser} from "../services/user.service";
import {getCurrentUserAuth} from "../services/getCurrentUserAuth";
import {isLoggedIn} from "../services/auth.service";
import {history} from "../browserHistory";

export const HomeView = (props) => {
    const {user, setUser} = props;

    useEffect(() => {
        if (!isLoggedIn()) {
            history.replace("/signin");
            return;
        }

        const currentUser = getCurrentUserAuth();
        getUser(currentUser.id)
            .then(response => {
                setUser(response.data);
            });
    }, []);

    return (
        <div>
            <div className="loginbgcolor">
                <h1>Home</h1>
            </div>
            <div>
                <p>3 random movies here</p>
                <p>Each movie will have a random review from our DB pop up</p>
                <p>Each movie will have a review average based on the number of reviews it got</p>

            </div>

            <div>
                <img className="movie-image" src="https://deepfocusreview.com/wp-content/uploads/2016/12/aliens.jpg"
                     alt=""/>
                <p>This is where a random review is going to go!</p>
                <p>This is where our review score will go based on the total amount of reviews. </p>
                <p>I may include movies that have the most reviews pop up as well.</p>
                <p>I could have multiple movie slots. One for most reviewed, one for best reviews and worst reviews
                    as a couple of examples.</p>
            </div>

            <div>

                <nav className="navbar navbar-light bg-info">
                    <h1>Like what you see? Connect with us on Social media!</h1>
                    <p><a href="https://www.facebook.com/" target="_blank"><img
                        src="https://cdn1.iconfinder.com/data/icons/logotypes/32/square-facebook-512.png" height="60"
                        width="60" alt=""/></a></p>
                    <p><a href="https://twitter.com/" target="_blank"><img
                        src="https://d1e2bohyu2u2w9.cloudfront.net/education/sites/default/files/product/twitter-product-image.png"
                        height="60" width="60" alt=""/></a></p>
                    <p><a href="https://www.linkedin.com/" target="_blank"><img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS4s3k1pIajgk3Rf-07CLW-WqbfKXE2VDXFA&usqp=CAU&ec=45761791"
                        height="60" width="60" alt=""/></a></p>
                    <p><a href="https://www.pinterest.com/" target="_blank"><img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEgxnwMTT4WrNoXdjQlJZE4Vxj1Gnd8v1OGg&usqp=CAU&ec=45761791"
                        height="60" width="60" alt=""/></a></p>

                </nav>
            </div>

            <div>
                <nav className="navbar navbar-light bg-secondary">
                    <div className="col-lg-12">
                        <h2>Contact us:</h2>

                        <p>Phone: 777-8675-309</p>
                        <p>Email: admin@tomrotten.com</p>
                    </div>
                </nav>
            </div>


        </div>
    );
}
