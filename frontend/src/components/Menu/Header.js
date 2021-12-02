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

  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(!open);
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
          component='span'>
          <Avatar sx={{ bgcolor: deepPurple[500] }}>A</Avatar>
        </IconButton>

        <Menu
          keepMounted
          open={open}
          onClose={handleClose}
        >
          <MenuItem>Профиль</MenuItem>

        </Menu>
      </div>
    </header>
  );
}
