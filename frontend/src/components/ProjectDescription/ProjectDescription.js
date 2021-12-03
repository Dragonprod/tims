/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import styles from './ProjectDescription.module.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from '@mui/material/Button';
import StartupImg1 from '../../assets/images/1.jpg';
import StartupImg2 from '../../assets/images/2.jpg';
import StartupImg3 from '../../assets/images/3.jpg';
import API from '../../api/api';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import ShareIcon from '@mui/icons-material/Share';
import IconButton from '@mui/material/IconButton';

export default function ProjectDescription(props) {
  const [isFavourite, setisFavourite] = useState(false);

  const id = props.id;
  const name = props.name;
  const description = props.description;
  const reviewCount = props.reviewCount;
  const avgMark = props.avgMark;
  const createdTime = props.createdTime;
  const statusTags = props.statusTags;
  const themeTags = props.themeTags;

  const onClick = props.onClick;
  const [open, setopen] = useState(false);

  useEffect(() => {
    setopen(props.open);
  }, [props.open]);

  const likeProcess = async e => {
    e.preventDefault();

    if (isFavourite) {
      setisFavourite(!isFavourite);
      const data = {
        user_id: 1,
        startup_id: id,
      };

      const res = await API.post(
        `/startup/like?user_id=${data.user_id}&startup_id=${data.startup_id}`
      );
      console.log(res.data.message);
    } else {
      setisFavourite(!isFavourite);
      const data = {
        user_id: 1,
        startup_id: id,
      };

      const res = await API.delete(
        `/startup/like?user_id=${data.user_id}&startup_id=${data.startup_id}`
      );
      console.log(res.data.message);
    }
  };

  return (
    <>
      {open && (
        <div className={styles.darkBackground}>
          <div className={styles.projectDescriptionCard}>
            <div className={styles.topButtonsContainer}>
              <Button
                className={styles.muiLikeButton}
                variant='text'
                onClick={likeProcess}
                startIcon={
                  isFavourite ? (
                    <FavoriteIcon className={styles.muiLikeIcon} />
                  ) : (
                    <FavoriteBorderIcon className={styles.muiLikeIcon} />
                  )
                }>
                {isFavourite ? 'В избранном' : 'В избранное'}
              </Button>
              <Button
                className={styles.muiShareButton}
                variant='text'
                startIcon={ShareIcon}>
                Поделиться
              </Button>
              <IconButton aria-label='delete'>
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
