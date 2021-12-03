/* eslint-disable no-unused-vars */
import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import styles from './CommentCard.module.css';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import DefaultAvatar from '../../assets/images/default_avatar.png';
import StarIcon from '@mui/icons-material/Star';
import API from '../../api/api';

export default function CommentCard(props) {
  const review = props._review

  return (
    <div className={styles.commentCard}>
      <Avatar className={styles.userAvatar} />
      <div className={styles.commentTitle}>
        <span className={styles.userName}>Юнин Иван</span>
        <span className={styles.pastTime}>2 дня назад</span>
      </div>
      <div className={styles.projectRate}>
        <StarIcon className={styles.iconStar} />
        <span className={styles.statsAmount}>{review.mark}/10</span>
      </div>
      <p className={styles.commentText}>
        {review.review}
      </p>
    </div>
  );
}
