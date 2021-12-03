/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import styles from './ProjectCardForAdmin.module.css';
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
import localforage from 'localforage';

export default function ProjectCardForAdmin(props) {
  const [isFavourite, setisFavourite] = useState(false);

  const id = props.id;
  const user_id = props.user_id;
  const name = props.name;
  const description = props.description;
  const reviewCount = props.reviewCount;
  const avgMark = props.avgMark;
  const createdTime = props.createdTime;
  const statusTags = props.statusTags;
  const themeTags = props.themeTags;
  const onClick = props.onClick;
  const inc = props.inc;
  const dec = props.dec;
  // const addProjectToFavourites = props.addProjectToFavourites
  // const deleteProjectToFavourites = props.deleteProjectToFavourites

  useEffect(() => {
    setisFavourite(props.isFavourite);
  }, [props.isFavourite]);

  const likeProcess = async e => {
    e.preventDefault();

    if (isFavourite) {
      setisFavourite(!isFavourite);
      const data = {
        user_id: user_id,
        startup_id: id,
      };

      const res = await API.delete(
        `/startup/like?user_id=${data.user_id}&startup_id=${data.startup_id}`
      );
      dec();
      // deleteProjectToFavourites()
      console.log(res.data.message);
    } else {
      setisFavourite(!isFavourite);
      const data = {
        user_id: user_id,
        startup_id: id,
      };

      const res = await API.post(
        `/startup/like?user_id=${data.user_id}&startup_id=${data.startup_id}`
      );
      inc();
      // addProjectToFavourites()
      console.log(res.data.message);
    }
  };

  return (
    <Card className={styles.card} variant='outlined'>
      <div className={styles.tagsContainer}>
        <div className={styles.statusProjectTagContainer}>{statusTags}</div>
        <div className={styles.themeProjectTagContainer}>{themeTags}</div>
      </div>
      <div className={styles.firstLine}>
        <span className={styles.startupName}>
          Обогреваемые остановки наземного транспорта
        </span>
        <span className={styles.organisationName}>Московский метрополитен</span>
        <span className={styles.startupName2}>
          Обогреваемые остановки наземного транспорта
        </span>
      </div>
      <div className={styles.secondLine}>
        <span className={styles.startuperName}>Оксана Валерьевна Савчук</span>
        <span className={styles.investorName}>Валерий Михайлович Абрамов</span>
      </div>
      <div className={styles.cardFooter}>
        <div className={styles.startuperContactContainer}>
          +7 (922) 321 0987
          <br />
          startup@gmail.com
        </div>
        <div className={styles.investorContactContainer}>
          +7 (962) 876 4532
          <br />
          abramvaler@mosmetro.com
        </div>

        <div className={styles.projectButtonsContainer}>
          <Button className={styles.muiAboutButton} variant='text'>
            О проекте
          </Button>
          <Button
            className={styles.muiReadMoreButton}
            variant='contained'
            onClick={onClick}>
            Открыть контакты
          </Button>
        </div>
      </div>
    </Card>
  );
}
