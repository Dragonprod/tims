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
  const onClick = props.onClick;
  const [isFavourite, setisFavourite] = useState(false);
  const [open, setopen] = useState(false);

  // const id = props.id
  // const name = props.name
  // const description = props.description
  // const reviewCount = props.reviewCount
  // const avgMark = props.avgMark
  // const createdTime = props.createdTime
  // const statusTags = props.statusTags
  // const themeTags = props.themeTags

  useEffect(() => {
    setopen(props.open);
  }, [props.open]);

  // const likeProcess = async e => {
  //   e.preventDefault();

  //   if (isFavourite) {
  //     setisFavourite(!isFavourite);
  //     const data = {
  //       user_id: 1,
  //       startup_id: id,
  //     };

  //     const res = await API.post(
  //       `/startup/like?user_id=${data.user_id}&startup_id=${data.startup_id}`
  //     );
  //     console.log(res.data.message);
  //   } else {
  //     setisFavourite(!isFavourite);
  //     const data = {
  //       user_id: 1,
  //       startup_id: id,
  //     };

  //     const res = await API.delete(
  //       `/startup/like?user_id=${data.user_id}&startup_id=${data.startup_id}`
  //     );
  //     console.log(res.data.message);
  //   }
  // };

  return (
    <>
      {open && (
        <div className={styles.darkBackground}>
          <div className={styles.projectDescriptionCard}>
            <div className={styles.topButtonsContainer}>
              <div className={styles.topButtonsInnerContainer}>
                <Button
                  className={styles.muiLikeButton}
                  variant='text'
                  // onClick={likeProcess}
                  startIcon={
                    isFavourite === true ? (
                      <FavoriteIcon className={styles.muiLikeIcon} />
                    ) : (
                      <FavoriteBorderIcon className={styles.muiLikeIcon} />
                    )
                  }>
                  {isFavourite === true ? 'В избранном' : 'В избранное'}
                </Button>
                <Button
                  className={styles.muiShareButton}
                  variant='text'
                  startIcon={<ShareIcon className={styles.muiShareIcon} />}>
                  Поделиться
                </Button>
              </div>
              <IconButton
                className={styles.muiCloseButton}
                aria-label='delete'
                onClick={onClick}>
                <CloseIcon />
              </IconButton>
            </div>
            <div className={styles.imageBoxContainer}>
              <h3 className={`${styles.boldHeader}`}>
                Обогреваемые остановки наземного транспорта
              </h3>
              <img
                className={`${styles.startupImg} ${styles.startupImgActive}`}
                src={StartupImg1}
                alt='Main'
              />
              <img
                className={`${styles.startupImg}`}
                src={StartupImg1}
                alt='1'
              />
              <img
                className={`${styles.startupImg}`}
                src={StartupImg2}
                alt='2'
              />
              <img
                className={`${styles.startupImg}`}
                src={StartupImg3}
                alt='3'
              />
            </div>
            <div className={styles.projectContainer}>
              <h3 className={`${styles.boldHeader}`}>
                Сведения о “Warm Stops”
              </h3>
              <h3 className={`${styles.boldHeader}`}>Описание продукта</h3>
              <h3 className={`${styles.boldHeader}`}>
                Кейсы использования продукта
              </h3>
              <h3 className={`${styles.boldHeader}`}>Польза продукта</h3>
              <h3 className={`${styles.boldHeader}`}>Мнения экспертов</h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
