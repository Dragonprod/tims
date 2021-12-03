/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import styles from './CommentCard.module.css';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import DefaultAvatar from '../../assets/images/default_avatar.png';
import StarIcon from '@mui/icons-material/Star';

export default function CommentCard() {
  return (
    <div className={styles.commentCard}>
      <Avatar className={styles.userAvatar} />
      <div className={styles.commentTitle}>
        <span className={styles.userName}>Фамилия Имя</span>
        <span className={styles.pastTime}>2 дня назад</span>
      </div>
      <div className={styles.projectRate}>
        <StarIcon className={styles.iconStar} />
        <span className={styles.statsAmount}>9/10</span>
      </div>
      <p className={styles.commentText}>
        За последние 7 лет я создал самый передовой в мире разговорный ИИ с
        открытым доменом для Replika - чат-бота №1 в США с более чем 10
        миллионами пользователей. В начале этого года я покинул Replika, чтобы
        вывести последние достижения в области разговорного ИИ на новый уровень.
      </p>
    </div>
  );
}
