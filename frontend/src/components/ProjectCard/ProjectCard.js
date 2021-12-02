/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import styles from './ProjectCard.module.css';
import Card from '@mui/material/Card';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StatusProjectTag from '../StatusProjectTag/StatusProjectTag';
import ThemeProjectTag from '../ThemeProjectTag/ThemeProjectTag';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export default function ProjectCard(props) {
  return (
    <Card className={styles.card} variant='outlined'>
      <div className={styles.tagsContainer}>
        <div className={styles.statusProjectTagContainer}>
          <StatusProjectTag />
        </div>
        <div className={styles.themeProjectTagContainer}>
          <ThemeProjectTag />
        </div>
      </div>
      <h1 className={styles.cardHeader}>
        Программное обеспечение для анализа транспортных потоков по видео
      </h1>
      <p className={styles.cardText}>
        Технология мониторинга может применяться как для учёта транспортных
        потоков, так и для адаптивного регулирования перекрёстков. Система
        способна определять ДТП, занятость парковочных мест, контролировать
        соблюдение правил дорожного движения.
      </p>
      <div className={styles.cardFooter}>
        <div className={styles.projectStatsContainer}>
          <div className={styles.projectComments}>
            <ChatBubbleOutlineIcon className={styles.iconComment} />
            <span className={styles.statsAmount}>10</span>
          </div>
          <div className={styles.projectRate}>
            <StarBorderIcon className={styles.iconStar} />
            <span className={styles.statsAmount}>5.8/10</span>
          </div>
          <div className={styles.projectDate}>
            <CalendarTodayIcon />
            <span className={styles.statsAmount}>10.11.2021</span>
          </div>
        </div>
        <div className={styles.projectButtonsContainer}>
          <Button
            className={styles.muiLikeButton}
            variant='text'
            startIcon={<FavoriteBorderIcon />}>
            В избранное
          </Button>
          <Button className={styles.muiReadMoreButton} variant='contained'>
            Подробнее
          </Button>
        </div>
      </div>
    </Card>
  );
}
