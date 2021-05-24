import React, {useEffect, useState} from 'react';
import { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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

    console.log(moviesList);

    return (
        <Router>
            <Fragment>
                <Route exact path="/" render={(props) => <Home {...props} moviesList={moviesList} />} />
            </Fragment>
        </Router>
        // <Fragment>
        //     <Header/>
        //     <Home moviesList={movies}/>
            
        // </Fragment>
    )
}