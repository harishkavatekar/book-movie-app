import React, {useEffect, useState} from 'react';
import './Details.css'

import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Header from '../../common/header/Header';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import YouTube from 'react-youtube';
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Box from '@material-ui/core/Box';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';


const useStyles = makeStyles({
    bold: {
      fontWeight: 600,
      paddingLeft:15
    },
    emptyStar: {
        color: '#000'
    },
    color: "Yellow"
  })

export default function Details(props) {

    const classes = useStyles();
    
    const movieId = (props.location && props.location.state) || {};

    const [movieDetail, setMovieDetail] = useState({})

    useEffect(() => {
        const getMovieDetails = async () => {
            const response = await fetch('/api/v1/movies/'+ movieId);
            const data = await response.json();
            console.log(data);
            setMovieDetail(movieDetail => ({...movieDetail, data}))
        }

        getMovieDetails();
        
    }, []);


    // console.log(movieDetail);
    // console.log(movieDetail.data);
    const { data } = movieDetail;
    console.log(data);

    const opts = {
        playerVars: {
        //   https://developers.google.com/youtube/player_parameters
        //   autoplay: 1,
        }
      };

      let videoId = "";

      if(data){
        const youTubeLink = data.trailer_url.split('=');
        videoId = youTubeLink[youTubeLink.length - 1];
      }
      

    // let {poster_url, rating, release_date,storyline,title, trailer_url, wiki_url} = data;
    // console.log(data.poster_url);
    return (
        <div>
            <Header/>
            <Link to="/">
                <Typography variant="button" display="block" className="back-btn">
                    <ArrowBackIosIcon fontSize="small" className="icon"/> Back to Home
                </Typography>
                
            </Link>
            {data?(
            <div className="movie-details-section">
                <div className="left">
                    <img src={data.poster_url} />
                </div>
                <div className="middle">
                    <Typography variant="h2" component="h2">
                        {data.title}
                    </Typography>
                    <Typography >
                        <span className={classes.bold}>Genres:</span>
                        {data.genres.map((item)=> 
                            <span key={item}>{item}</span>,
                        )}
                    </Typography>
                    <Typography>
                       <span className={classes.bold}>Duration:</span>
                       <span>{data.duration}</span>
                    </Typography>
                    <Typography>
                       <span className={classes.bold}>Release Date:</span>
                       <span>{data.release_date}</span>
                    </Typography>
                    <Typography>
                       <span className={classes.bold}>Rating:</span>
                       <span>{data.rating}</span>
                    </Typography>
                    <Typography className="margin">
                       <span className={classes.bold}>Plot: </span>
                       <span>
                           <a href={data.wiki_url}>(wiki link)</a> 
                            {data.storyline}
                       </span>
                    </Typography>

                    <Typography variant="body1">
                       <span className={classes.bold}>Trailor: </span>
                    </Typography>
                    <div className="video-section">
                        <YouTube videoId={videoId} opts={opts}  className="video-align"/>
                    </div>

                </div>
                <div className="right">
                    <Box component="fieldset" mb={3} borderColor="transparent">
                        <Typography variant="h6">Rate this movie</Typography>
                        <Rating
                            name="customized-empty"
                            defaultValue={0}
                            precision={0.5}
                            className={classes.color}
                            emptyIcon={<StarBorderIcon fontSize="inherit" className={classes.emptyStar}/>}
                        />
                    </Box>

                    <div className="cast">
                        <Typography variant="h6">Artists</Typography>
                        <GridList cols={2} className="artist-grid">
                            {data.artists.map((artist) => (
                            <GridListTile key={artist.id}>
                                <img src={artist.profile_url} alt={artist.first_name} />
                                <GridListTileBar
                                    title={artist.first_name + ' ' + artist.last_name}
                                />
                            </GridListTile>
                        ))}
                        </GridList>
                    </div>
                
                </div>
            </div>
            ): null}
        </div>
    )
}