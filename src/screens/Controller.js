import React, {useEffect, useState} from 'react';
import { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../common/header/Header';
import BookShow from './bookshow/BookShow';
import Details from './details/Details';
import Home from './home/Home';


export default function Controller() {

    const [moviesList, setMoviesList] = useState([]);

    const [location, setLocation] = useState('');

    useEffect(() => {

        const getMovies = async () => {
            const response = await fetch('/api/v1/movies?limit=20');
            const data = await response.json();
            setMoviesList(data.movies);
        }

        getMovies();
    }, []);
    return (
        <div>
            {/* <Header /> */}
            <Router>
                <Fragment>
                    <Route exact path="/" render={(props) => <Home {...props} moviesList={moviesList} />} />
                    <Route exact path="/details" render={(props) => <Details {...props} />} />
                    <Route exact path="/bookshow" render={(props) => <BookShow {...props} />} />
                </Fragment>
            </Router>
        </div>
        // <Fragment>
        //     <Header/>
        //     <Home moviesList={movies}/>
            
        // </Fragment>
    )
}