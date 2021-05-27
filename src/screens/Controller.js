import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BookShow from './bookshow/BookShow';
import Details from './details/Details';
import Home from './home/Home';


export default function Controller() {

    const [moviesList, setMoviesList] = useState([]);

    useEffect(() => {

        const getMovies = async () => {
            const response = await fetch('/api/v1/movies?limit=20');
            const data = await response.json();
            setMoviesList(data.movies);
        }

        getMovies();
    }, []);
    return (
        <Router>
            <Fragment>
                <Route exact path="/" render={(props) => <Home {...props} moviesList={moviesList} />} />
                <Route exact path="/details/:id" render={(props) => <Details {...props} />} />
                <Route exact path="/bookshow/:id" render={(props) => <BookShow {...props} />} />
            </Fragment>
        </Router>
    )
}