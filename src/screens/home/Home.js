import React, {useEffect} from 'react';
import './Home.css'
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Header from '../../common/header/Header';
import TextField from '@material-ui/core/TextField';


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
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    }
    // title: {
    //   color: theme.palette.primary.light,
    // },
    // titleBar: {
    //   background:
    //     'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    // },
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

export default function Home(props) {

    console.log(props);

    useEffect(() => {
        
    }, [props.moviesList]);

    const classes = useStyles();
    const cardClass = useCardStyles();

    // if(moviesList.lengh > 0){
        const upcomingMovies = props.moviesList.filter((list)=>{
            return list.status === 'PUBLISHED';
        })

        const releasedMovies = props.moviesList.filter((list)=>{
            return list.status === 'RELEASED';
        })

        
    // }

    return (
        <div>
            <Header/>
           <div className="upcoming-movie-section">
                <div className="upcoming-movie-header">Upcoming Movies</div>

                <div className={classes.root}>
                    <GridList cellHeight={250} className={classes.gridList} cols={6}>
                        {upcomingMovies.map((movie) => (
                        <GridListTile key={movie.id}>
                            <img src={movie.poster_url} alt={movie.title} />
                            <GridListTileBar
                            title={movie.title}
                            // classes={{
                            //     root: classes.titleBar,
                            //     title: classes.title
                            // }}
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
                            <img src={movie.poster_url} alt={movie.title} />
                            <GridListTileBar
                            title={movie.title}
                            subtitle= {<span>Release Date: {movie.release_date} </span>}
                            // classes={{
                            //     root: classes.titleBar,
                            //     title: classes.title
                            // }}
                            />
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
                    </CardContent>
                </Card>
                </div>
            </div>
        </div>
    )
}