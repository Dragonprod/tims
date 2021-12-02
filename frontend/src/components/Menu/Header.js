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

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
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
          options={top100Films.map(option => option.title)}
          renderInput={params => (
            <TextField {...params} label='Поиск решения' />
          )}
        />
      </div>
      <div className={styles.userContainer}>
        <Button
          className={styles.muiAddButton}
          variant='contained'
          startIcon={<AddCircleIcon />}>
          Добавить
        </Button>
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
          <Avatar sx={{ bgcolor: deepPurple[500] }}>A</Avatar>
        </IconButton>

        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Мои стартапы</MenuItem>
          <MenuItem onClick={handleClose}>Мои подписки</MenuItem>
          <MenuItem onClick={handleClose}>Профиль</MenuItem>
          <MenuItem />
          <MenuItem onClick={handleClose}>Выйти</MenuItem>

        </Menu>
      </div>
    </header>
  );
}