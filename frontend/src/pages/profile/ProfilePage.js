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

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import localforage from 'localforage';

export default function ProfilePage() {
  const [profileActive, setprofileActive] = useState(true);
  const [myStartupsActive, setmyStartupsActive] = useState(false);
  const [mySubsActive, setmySubsActive] = useState(false);

  useEffect(() => {
    //TODO: Get user data from redux
  }, []);

  const handleProfileTabIsClicked = () => {
    setprofileActive(true);
    setmyStartupsActive(false);
    setmySubsActive(false);
  };

  const handleStartupsTabIsClicked = () => {
    setprofileActive(false);
    setmyStartupsActive(true);
    setmySubsActive(false);
  };

  const handleSubsTabIsClicked = () => {
    setprofileActive(false);
    setmyStartupsActive(false);
    setmySubsActive(true);
  };

  useEffect(() => {}, []);

  return (
    <div className={styles.mainGrid}>
      <Header />
      <div className={styles.headerContainer}>
        <h2
          className={`${styles.boldHeader} ${styles.profileHeader} ${
            profileActive === true ? styles.profileHeaderActive : ''
          }`}
          onClick={handleProfileTabIsClicked}>
          Профиль
        </h2>
        <h2
          className={`${styles.boldHeader} ${styles.myStartupsHeader} ${
            myStartupsActive === true ? styles.myStartupsHeaderActive : ''
          }`}
          onClick={handleStartupsTabIsClicked}>
          Мои стартапы
        </h2>
        <h2
          className={`${styles.boldHeader} ${styles.mySubscribesHeader} ${
            mySubsActive === true ? styles.mySubscribesHeaderActive : ''
          }`}
          onClick={handleSubsTabIsClicked}>
          Мои подписки
        </h2>
      </div>

      <div className={`${styles.formContainer}`}>
        {profileActive && (
          <>
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
                type='password'
              />
              <Button
                className={styles.muiEditButton}
                variant='text'
                startIcon={<EditIcon />}>
                Изменить пароль
              </Button>
            </div>
          </>
        )}
        {myStartupsActive && (
          <>
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
                type='password'
              />
              <Button
                className={styles.muiEditButton}
                variant='text'
                startIcon={<EditIcon />}>
                Изменить пароль
              </Button>
            </div>
          </>
        )}
        {mySubsActive && (
          <>
            <div className={`${styles.firstLine}`}>
              <h3 className={`${styles.smallSectionHeader}`}>
                Подписка на рассылки
              </h3>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label='Новые проекты по моему профилю'
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label='Изменения статуса проектов из избранного'
                />
              </FormGroup>
            </div>
            <div className={`${styles.secondLine}`}>
              <h3 className={`${styles.smallSectionHeader}`}>
                Новые проекты и сообщения от авторов
              </h3>
              <p className={`${styles.smallSectionSubtitle}`}>
                Выберите канал для получения уведомлений
              </p>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label='E-mail' />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label='Telegram'
                />
              </FormGroup>
            </div>
            <div className={`${styles.thirdLine}`}>
              <h3 className={`${styles.smallSectionHeader}`}>
                Ваши активные подписки:
              </h3>
              <div className={`${styles.subscriptionCard}`}>
                <span>Городской транспорт, Метрополитен</span>
                <div className={`${styles.subscriptionIconsBox}`}>
                  <PauseIcon className={`${styles.subscriptionIcon}`} />
                  <CloseIcon className={`${styles.subscriptionIcon}`} />
                </div>
              </div>
              <div className={`${styles.subscriptionCard}`}>
                <span>Городской транспорт, Наземный транспорт</span>
                <div className={`${styles.subscriptionIconsBox}`}>
                  <PauseIcon className={`${styles.subscriptionIcon}`} />
                  <CloseIcon className={`${styles.subscriptionIcon}`} />
                </div>
              </div>
              <div className={`${styles.subscriptionCard}`}>
                <span>Новые виды мобильности</span>
                <div className={`${styles.subscriptionIconsBox}`}>
                  <PlayArrowIcon className={`${styles.subscriptionIcon}`} />
                  <CloseIcon className={`${styles.subscriptionIcon}`} />
                </div>
              </div>
              <Button
                className={styles.muiEditButton}
                variant='text'
                startIcon={<AddIcon />}>
                Добавить ещё
              </Button>
            </div>
            <Button className={`${styles.muiSaveButton}`} variant='contained'>
              Сохранить изменения
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
