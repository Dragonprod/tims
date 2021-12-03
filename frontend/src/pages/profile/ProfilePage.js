/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Header from '../../components/Menu/Header';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import styles from './ProfilePage.module.css';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import API from '../../api/api';
import StatusProjectTag from '../../components/StatusProjectTag/StatusProjectTag';
import ThemeProjectTag from '../../components/ThemeProjectTag/ThemeProjectTag';

import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import localforage from 'localforage';

export default function ProfilePage() {
  const [profileActive, setprofileActive] = useState(true);
  const [myStartupsActive, setmyStartupsActive] = useState(false);
  const [mySubsActive, setmySubsActive] = useState(false);

  useEffect(() => {
    //TODO: Get user data from redux
  }, []);

  const [userId, setuserId] = useState(-1);

  const [startupData, setstartupData] = useState([]);
  const [favouriteStartupData, setfavouriteStartupData] = useState([]);
  const [favouriteStartupDataCount, setfavouriteStartupDataCount] = useState(0);
  const [startupReviewsData, setstartupReviewsData] = useState([]);

  const [searchValue, setsearchValue] = useState(0);
  const [rowValue, setrowValue] = useState(10);
  const [page, setPage] = useState(1);
  const [openDesc, setopenDesc] = useState(false);

  const [solutionTabIsClicked, setsolutionTabIsClicked] = useState(true);
  const [favouritesTabIsClicked, setfavouritesTabIsClicked] = useState(false);

  const [startupForRender, setstartupForRender] = useState([]);

  const handleSolutionTabIsClicked = () => {
    setsolutionTabIsClicked(true);
    setfavouritesTabIsClicked(false);
  };

  const handleFavouriteTabIsClicked = () => {
    setsolutionTabIsClicked(false);
    setfavouritesTabIsClicked(true);
  };

  const handleMoreInfo = startup => {
    setopenDesc(!openDesc);
    setstartupForRender(startup);
  };

  const handleMoreInfoClose = () => {
    setopenDesc(!openDesc);
  };

  const incrementCounter = () => {
    setfavouriteStartupDataCount(state => state + 1);
  };

  const decrementCounter = () => {
    setfavouriteStartupDataCount(state => state - 1);
  };

  const handleChange = async event => {
    setsearchValue(event.target.value);
    switch (event.target.value) {
      case 0:
        {
          const startupsResponse = await API.get(
            '/startup?sort_date=DESC&offset=0&limit=2000'
          );
          setstartupData(startupsResponse.data.startups);
        }
        break;
      case 1:
        {
          const startupsResponse = await API.get(
            '/startup?sort_date=ASC&offset=0&limit=2000'
          );
          setstartupData(startupsResponse.data.startups);
        }
        break;
      case 2:
        {
          const startupsResponse = await API.get(
            '/startup?sort_mark=DESCC&offset=0&limit=2000'
          );
          setstartupData(startupsResponse.data.startups);
        }
        break;
      case 3:
        {
          const startupsResponse = await API.get(
            '/startup?sort_mark=ASC&offset=0&limit=2000'
          );
          setstartupData(startupsResponse.data.startups);
        }
        break;

      default:
        break;
    }
  };

  const handleChangeRowValue = event => {
    setrowValue(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const addProjectToFavourites = startup => {
    setfavouriteStartupData(favouriteStartupData => [
      ...favouriteStartupData,
      startup,
    ]);
  };

  const deleteProjectToFavourites = startup => {
    setfavouriteStartupData(
      favouriteStartupData.filter(item => item.id !== startup.id)
    );
  };

  useEffect(() => {
    const getStartupsData = async () => {
      const startupsResponse = await API.get(
        '/startup?sort_mark=DESC&offset=0&limit=2000'
      );
      setstartupData(startupsResponse.data.startups);

      const userIdStorage = await localforage.getItem('user_id');
      setuserId(userIdStorage);

      const favouriteStartupsResponse = await API.get(
        `/user/favorites/${userIdStorage}`
      );
      setfavouriteStartupData(favouriteStartupsResponse.data.favorites_startup);
      setfavouriteStartupDataCount(
        favouriteStartupsResponse.data.favorites_startup.length
      );

      const startupsReviewsResponse = await API.get(`/reviews`);
      setstartupReviewsData(startupsReviewsResponse.data.reviews);
    };
    getStartupsData();
  }, []);

  return (
    <div className={styles.mainGrid}>
      <Header />
      <div className={styles.headerContainer}>
        <h2 className={`${styles.boldHeader} ${styles.profileHeader}`}>
          Профиль
        </h2>
        <h2 className={`${styles.boldHeader} ${styles.myStartupsHeader}`}>
          Мои стартапы
        </h2>
        <h2 className={`${styles.boldHeader} ${styles.mySubscribesHeader}`}>
          Мои подписки
        </h2>
      </div>
      <div className={`${styles.formContainer}`}>
        <Avatar className={styles.avatar} />
        <div className={`${styles.firstLine}`}>
          <TextField
            className={styles.input}
            id='outlined-basic'
            label='Имя'
            variant='outlined'
          />
          <TextField
            className={styles.input}
            id='outlined-basic'
            label='Фамилия'
            variant='outlined'
          />
          <TextField
            className={styles.input}
            id='outlined-basic'
            label='Номер телефона'
            variant='outlined'
          />
          <TextField
            className={styles.input}
            id='outlined-basic'
            label='E-mail'
            variant='outlined'
          />
          <Button
            className={styles.muiEditButton}
            variant='text'
            startIcon={<EditIcon />}>
            Редактировать данные
          </Button>
        </div>
        <div className={`${styles.secondLine}`}>
          <TextField
            className={styles.input}
            id='outlined-basic'
            label='Пароль'
            variant='outlined'
          />
          <Button
            className={styles.muiEditButton}
            variant='text'
            startIcon={<EditIcon />}>
            Изменить пароль
          </Button>
        </div>
      </div>
      {/* <h2
        className={`${styles.boldHeader} ${styles.solutionsHeader} ${
          solutionTabIsClicked === true ? styles.solutionsHeaderActive : ''
        }`}
        onClick={handleSolutionTabIsClicked}>
        Профиль
      </h2>
      <h2
        className={`${styles.boldHeader} ${styles.favouritesHeader} ${
          favouritesTabIsClicked === true ? styles.favouritesHeaderActive : ''
        }`}
        onClick={handleFavouriteTabIsClicked}>
        Мои стартапы
      </h2> */}
    </div>
  );
}
