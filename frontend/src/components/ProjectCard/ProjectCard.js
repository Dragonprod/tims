/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import styles from './ProjectCard.module.css';
import Card from '@mui/material/Card';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StatusProjectTag from '../StatusProjectTag/StatusProjectTag';
import ThemeProjectTag from '../ThemeProjectTag/ThemeProjectTag';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import API from '../../api/api';
import localforage from "localforage";

export default function ProjectCard(props) {
  const [isFavourite, setisFavourite] = useState(false)

  const id = props.id
  const user_id = props.user_id
  const name = props.name
  const description = props.description
  const reviewCount = props.reviewCount
  const avgMark = props.avgMark
  const createdTime = props.createdTime
  const statusTags = props.statusTags
  const themeTags = props.themeTags
  const onClick = props.onClick

  const likeProcess = async e => {
    e.preventDefault();


    if (isFavourite) {
      setisFavourite(!isFavourite);
      const data = {
        user_id: user_id,
        startup_id: id,
      };

      const res = await API.post(`/startup/like?user_id=${data.user_id}&startup_id=${data.startup_id}`);
      console.log(res.data.message);
    }
    else {
      setisFavourite(!isFavourite);
      const data = {
        user_id: user_id,
        startup_id: id,
      };

      const res = await API.delete(`/startup/like?user_id=${data.user_id}&startup_id=${data.startup_id}`);
      console.log(res.data.message);
    }

  };
  const handleFavourite = () => {
    setisFavourite(!isFavourite);
  }
  return (
    <Card className={styles.card} variant='outlined'>
      <div className={styles.tagsContainer}>
        <div className={styles.statusProjectTagContainer}>
          {/* <StatusProjectTag status={1} /> */}
          {statusTags}
        </div>
        <div className={styles.themeProjectTagContainer}>
          {/* <ThemeProjectTag theme={1} /> */}
          {themeTags}
        </div>
      </div>
      <h1 className={styles.cardHeader}>
        {name}
      </h1>
      <p className={styles.cardText}>
        {description}
      </p>
      <div className={styles.cardFooter}>
        <div className={styles.projectStatsContainer}>
          <div className={styles.projectComments}>
            <ChatBubbleOutlineIcon className={styles.iconComment} />
            <span className={styles.statsAmount}>{reviewCount}</span>
          </div>
          <div className={styles.projectRate}>
            <StarBorderIcon className={styles.iconStar} />
            <span className={styles.statsAmount}>{avgMark}/10</span>
          </div>
          <div className={styles.projectDate}>
            <CalendarTodayIcon />
            <span className={styles.statsAmount}>{createdTime}</span>
          </div>
        </div>
        <div className={styles.projectButtonsContainer}>
          <Button
            className={styles.muiLikeButton}
            variant='text'
            onClick={likeProcess}
            startIcon={(isFavourite === true) ? <FavoriteIcon /> : <FavoriteBorderIcon />}>
            {(isFavourite === true) ? "В избранном" : "В избранное"}
          </Button>
          <Button className={styles.muiReadMoreButton} variant='contained' onClick={onClick}>
            Подробнее
          </Button>
        </div>
      </div>
    </Card>
  );
}
