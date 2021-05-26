import React, {useEffect, useState} from 'react';
import './Home.css'


import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Header from '../../common/header/Header';
import TextField from '@material-ui/core/TextField';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Details from '../details/Details';
import useToken from '../../common/auth/useToken';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: 'nowrap',
      transform: 'translateZ(0)',
    }
}));

const useCardStyles = makeStyles((theme)=>({
    root:{
        minWidth: 240,
        maxWidth:240
    },
    title:{
        color:theme.palette.primary.light
    }
}))

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 250,
      width: 220
    },
  },
};

export default function Home(props) {

    const classes = useStyles();
    const cardClass = useCardStyles();

    const [genreList, setGenresList] = useState([]);
    const [artistList, setArtistList] = useState([]);

    const [genre, setGenre] = useState([]);
    const [artist, setArtist] = useState([]);

    

    useEffect(() => {

        const getGenres = async () => {
            const response = await fetch('/api/v1/genres');
            const genreData = await response.json();
            const genres = genreData.genres;
            genres.map((item)=> {
                setGenresList(genreList=> ([...genreList, item.genre]));
            })
    
        }
    
        const getArtists = async () => {
            const response = await fetch('/api/v1/artists?limit=20');
            const artistData = await response.json();
            const artists = artistData.artists;
            artists.map((item)=>{
                let firstAndLastname = item.first_name + " " + item.last_name;
                setArtistList(artistList => ([...artistList, firstAndLastname]))
            })
        }

        getGenres();
        getArtists();

    }, []);

    const handleChange = (event) => {
        setGenre(event.target.value);
        setArtist(event.target.value);
    };

    const upcomingMovies = props.moviesList.filter((list)=>{
        return list.status === 'PUBLISHED';
    })

    const releasedMovies = props.moviesList.filter((list)=>{
        return list.status === 'RELEASED';
    })

    return (
        <div>
            <Header/>
           <div className="upcoming-movie-section">
                <div className="upcoming-movie-header">Upcoming Movies</div>

                <div className={classes.root}>
                    <GridList cellHeight={250} className={classes.gridList} cols={6}>
                        {upcomingMovies.map((movie) => (
                        <GridListTile key={movie.id}>
                            <img src={movie.poster_url} alt={movie.title} className="movie-img" />
                            <GridListTileBar
                            title={movie.title}
                            />
                        </GridListTile>
                        ))}
                    </GridList>
                </div>
            </div>
            <div className="released-movie-section">
                <div className="release-movies-list">
                    <GridList cellHeight={350} cols={4} >
                        {releasedMovies.map((movie) => (
                        <GridListTile key={movie.id} className="movies-grid-list">
                            <Link to={{pathname:"/details", state: movie.id}}>
                                <img src={movie.poster_url} alt={movie.title} className="movie-img" />
                                <GridListTileBar
                                    title={movie.title}
                                    subtitle= {<span>Release Date: {movie.release_date} </span>}
                                />
                            </Link>
                        </GridListTile>
                        ))}
                    </GridList>
                </div>
                <div className="filter-section">
                <Card className={cardClass.root}>
                    <CardContent>
                        <Typography className={cardClass.title} color="textSecondary" gutterBottom>
                            FIND MOVIES BY:
                        </Typography>

                        <form noValidate autoComplete="off">

                            <FormControl className="input-width">
                                <TextField id="movie-name" label="Movie Name" />
                            </FormControl>

                            <FormControl className="input-width">
                                <InputLabel id="genre-mutiple-checkbox-label">Genres</InputLabel>
                                <Select
                                labelId="genre-mutiple-checkbox-label"
                                id="genre-mutiple-checkbox"
                                multiple
                                value={genre}
                                onChange={handleChange}
                                input={<Input />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                                >
                                {genreList.map((item, index) => (
                                    <MenuItem key={index} value={item}>
                                        <Checkbox checked={genre.indexOf(item) > -1} />
                                        <ListItemText primary={item} />
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>

                            <FormControl className="input-width">
                                <InputLabel id="artist-mutiple-checkbox-label">Artists</InputLabel>
                                <Select
                                labelId="artist-mutiple-checkbox-label"
                                id="artist-mutiple-checkbox"
                                multiple
                                value={artist}
                                onChange={handleChange}
                                input={<Input />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                                >
                                {artistList.map((item, index) => (
                                    <MenuItem key={index} value={item}>
                                        <Checkbox checked={artist.indexOf(item) > -1} />
                                        <ListItemText primary={item} />
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>

                            <FormControl className="input-width">
                                <TextField
                                    id="date"
                                    label="Release Date start"
                                    type="date"
                                    defaultValue="dd-mm-yyyy"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                />
                            </FormControl>
                            <FormControl className="input-width">
                                <TextField
                                    id="date"
                                    label="Release Date End"
                                    type="date"
                                    defaultValue="dd-mm-yyyy"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                />
                            </FormControl>
                            <Button variant="contained" color="primary" className="apply-button">Apply</Button>
                        </form>
                    </CardContent>
                </Card>
                </div>
            </div>
        </div>
    )
}