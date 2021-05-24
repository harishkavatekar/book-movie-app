import React, {useEffect} from 'react';
import './Details.css'

import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Header from '../../common/header/Header';
import Typography from '@material-ui/core/Typography';


export default function Details(props) {
    
    const movieId = (props.location && props.location.state) || {};


    useEffect(() => {
        const getMovieDetails = async () => {
            const response = await fetch('/api/v1/movies/'+ movieId);
            const data = await response.json();
            console.log(data);
        }

        getMovieDetails();
        
    }, []);


    return (
        <div>
            <Header/>
            <Link to="/">
                <Typography variant="button" display="block" className="back-btn">
                    <ArrowBackIosIcon fontSize="small" className="icon"/> Back to Home
                </Typography>
                
            </Link>
        </div>
    )
}