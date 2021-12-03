/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import styles from './Header.module.css';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DefaultAvatar from "../../assets/images/default_avatar.png";

const search = [
  { title: 'Тема 1'},
  { title: 'Тема 2'},
  { title: 'Тема 3'},
  { title: 'Тема 4'},
  { title: 'Тема 5'},
  { title: 'Тема 6'},
  { title: 'Тема 7'},
  { title: 'Тема 8'},
  { title: 'Тема 9'},
  { title: 'Тема 10'},
  { title: 'Тема 11'},
  { title: 'Тема 12'},
  { title: 'Тема 13'},
  { title: 'Тема 14'},
  { title: 'Тема 15'},
  { title: 'Тема 16'},
  { title: 'Тема 17'},
  { title: 'Тема 18'},
  { title: 'Тема 19'},
  { title: 'Тема 20'},
];

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className={styles.upperMenuHeader}>
      <Link className={styles.upperMenuLogo} to='/'>
        <Logo className={styles.upperMenuLogo} />
      </Link>
      <div className={styles.searchContainer}>
        <SearchIcon className={styles.muiSearchIcon} />
        <Autocomplete
          className={styles.muiAutocomplete}
          id='free-solo-demo'
          freeSolo
          options={search.map(option => option.title)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Поиск решения"
            />
          )}
        />
      </div>
      <div className={styles.userContainer}>
        {/* <Button
          className={styles.muiAddButton}
          variant='contained'
          startIcon={<AddCircleIcon />}>
          Добавить
        </Button> */}
        <IconButton
          className={styles.muiBellButton}
          color='primary'
          aria-label='upload picture'
          component='span'>
          <NotificationsNoneIcon className={styles.muiBellIcon} />
        </IconButton>
        <IconButton
          color='primary'
          aria-label='upload picture'
          onClick={handleClick}
          component='span'>
          <Avatar src={DefaultAvatar} />
        </IconButton>

        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <Link className={styles.upperMenuLogo} to='/subscriptions'>
            <MenuItem onClick={handleClose}>Мои подписки</MenuItem>
          </Link>
          <Link className={styles.upperMenuLogo} to='/startups'>
            <MenuItem onClick={handleClose}>Мои стартапы</MenuItem>
          </Link>
          <Link className={styles.upperMenuLogo} to='/profile'>
            <MenuItem onClick={handleClose}>Профиль</MenuItem>
          </Link>
          <Link className={styles.upperMenuLogo} to='/'>
            <MenuItem onClick={handleClose}>Выйти</MenuItem>
          </Link>
        </Menu>
      </div>
    </header>
  );
}
