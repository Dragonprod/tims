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



  const handleSolutionTabIsClicked = () => {
    setsolutionTabIsClicked(true);
    setfavouritesTabIsClicked(false);
  };

  const handleFavouriteTabIsClicked = () => {
    setsolutionTabIsClicked(false);
    setfavouritesTabIsClicked(true);
  };


  useEffect(() => {
  }, []);

  return (
    <div className={styles.mainGrid}>
      <Header />
      <div
        className={`${styles.boldHeader} ${styles.solutionsHeader} ${solutionTabIsClicked === true ? styles.solutionsHeaderActive : ''
          }`}
        onClick={handleSolutionTabIsClicked}>

      </div>
      <div className={styles.headerContainer}>
        <h2 className={`${styles.boldHeader} ${styles.profileHeader} ${profileActive === true ? style.a : ''}`} >
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
