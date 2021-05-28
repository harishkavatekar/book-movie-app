import React, { useState } from 'react';
import './Header.css';
import logoIcon from '../../assets/logo.svg';
import Button from '@material-ui/core/Button';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Login from '../auth/Login';
import Register from '../auth/Register';
import useToken from '../auth/useToken';
import { Link, useHistory } from 'react-router-dom';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


const Header = function (props) {

  const pathname = props.movieDetail.location.pathname;

  let history = useHistory();

  const { token } = useToken();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [showModel, setShowModel] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };



  const handleOpenModal = () => {
    setShowModel(true);
  }

  const handleCloseModal = () => {
    setShowModel(false);
  }

  const onLogout = () => {
    sessionStorage.clear();
    window.location.href = '/';
  }

  const handleBookShowModel = () => {
    if (!token) {
      setShowModel(true);
    } else {
      history.push("/bookshow/" + props.movieDetail.match.params.id);
    }


  }

  return (
    <div className="header">
      <div className="logo">
        <img src={logoIcon} alt="Movie Logo" className="logo-icon" />
      </div>
      <div className="button-section">
        {(pathname.includes('/details')) ? (
          // <Link to={"/bookshow/" + props.movieDetail.match.params.id} >
            <Button variant="contained" color="primary" className="btn-align" onClick={handleBookShowModel}>Book Show</Button>
          // </Link>
        ) : null}
        {token ? (
          <Button variant="contained" className="btn-align" onClick={onLogout}>Logout</Button>
        ) : null}
        {!token ? (
          <Button variant="contained" className="btn-align" onClick={handleOpenModal}>Login</Button>
        ) : null}



        <ReactModal
          isOpen={showModel}
          contentLabel="onRequestClose Example"
          onRequestClose={handleCloseModal}
          ariaHideApp={false}
          className="model-align"
        >

          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Login" {...a11yProps(0)} />
              <Tab label="Register" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction} className="tab-content">
              <Typography>
                <Login />
              </Typography>

            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction} className="tab-content">
              <Typography>
                <Register />
              </Typography>
            </TabPanel>

          </SwipeableViews>
        </ReactModal>
      </div>
    </div>
  )
}


export default Header;