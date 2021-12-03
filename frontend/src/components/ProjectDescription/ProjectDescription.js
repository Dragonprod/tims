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
import AttachFileIcon from '@mui/icons-material/AttachFile';
import StatusProjectTag from '../StatusProjectTag/StatusProjectTag';
import ThemeProjectTag from '../ThemeProjectTag/ThemeProjectTag';

export default function ProjectDescription(props) {
  const onClick = props.onClick;
  const [isFavourite, setisFavourite] = useState(false);
  const [open, setopen] = useState(false);

  const imagesSrc = [StartupImg1, StartupImg2, StartupImg3];
  const [primaryImageSrc, setprimaryImageSrc] = useState(StartupImg1);

  const id = props.id
  const name = props.name
  const description = props.description
  const reviewCount = props.reviewCount
  const avgMark = props.avgMark
  const createdTime = props.createdTime
  const statusTags = props.statusTags
  const themeTags = props.themeTags

  useEffect(() => {
    setopen(props.open);
  }, [props.open]);

  const likeProcess = async e => {
    e.preventDefault();
    setisFavourite(!isFavourite);
  };

  const changeImage = (id) => {
    switch (id) {
      case 0:
        setprimaryImageSrc(imagesSrc[0])
        break;
      case 1:
        setprimaryImageSrc(imagesSrc[1])
        break;
      case 2:
        setprimaryImageSrc(imagesSrc[2])
        break;
      default:
        break;
    }
  };

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
                  onClick={likeProcess}
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
                src={primaryImageSrc}
                alt='Main'
              />
              <img
                className={`${styles.startupImg}`}
                onClick={() => changeImage(0)}
                src={StartupImg1}
                alt='1'
              />
              <img
                className={`${styles.startupImg}`}
                onClick={() => changeImage(1)}
                src={StartupImg2}
                alt='2'
              />
              <img
                className={`${styles.startupImg}`}
                onClick={() => changeImage(2)}
                src={StartupImg3}
                alt='3'
              />
              <div className={styles.attachmentContainer}>
                <div className={styles.attachmentItemContainer}>
                  <AttachFileIcon className={styles.attachIcon} />
                  <span className={styles.attachmentText}>
                    Сертификат{' '}
                    <span className={styles.attachmentSize}>(PDF, 2 Мб)</span>
                  </span>
                </div>
                <div className={styles.attachmentItemContainer}>
                  <AttachFileIcon className={styles.attachIcon} />
                  <span className={styles.attachmentText}>
                    Сертификат{' '}
                    <span className={styles.attachmentSize}>(PDF, 2 Мб)</span>
                  </span>
                </div>
                <div className={styles.attachmentItemContainer}>
                  <AttachFileIcon className={styles.attachIcon} />
                  <span className={styles.attachmentText}>
                    Сертификат{' '}
                    <span className={styles.attachmentSize}>(PDF, 2 Мб)</span>
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.projectTextContainer}>
              <h3 className={`${styles.boldHeader}`}>
                Сведения о “Warm Stops”
              </h3>
              <div className={styles.statsTable}>
                <div>
                  Статус: <StatusProjectTag status={6} />{' '}
                </div>
                <div>
                  Категория: <ThemeProjectTag theme={4} />{' '}
                </div>
                <div>
                  В организации: <span>Менее 20</span>
                </div>
                <div>
                  Сертификация: <span>Требуется</span>
                </div>
                <div>Запрос к акселератору и видение пилотного проекта</div>
              </div>
              <h3 className={`${styles.boldHeader}`}>Описание продукта</h3>
              <p className={styles.text}>
                За последние 7 лет я создал самый передовой в мире разговорный
                ИИ с открытым доменом для Replika - чат-бота №1 в США с более
                чем 10 миллионами пользователей. В начале этого года я покинул
                Replika, чтобы вывести последние достижения в области
                разговорного ИИ на новый уровень.
              </p>
              <p className={styles.text}>
                Наше новое приложение Botify позволяет пользователям создавать
                фотореалистичные цифровые персоны для увлекательных бесед. Для
                каждой цифровой персоны можно настроить индивидуальный персонаж
                и таким образом создать уникальную личность любого человека.
                Хотите поговорить с Маском о колонизации Марса? Может быть, вы
                хотите спросить Иисуса о шумихе вокруг NFT? Вы можете сделать
                все это в Botify.
              </p>
              <h3 className={`${styles.boldHeader}`}>
                Кейсы использования продукта
              </h3>
              <p className={styles.text}>
                За последние 7 лет я создал самый передовой в мире разговорный
                ИИ с открытым доменом для Replika - чат-бота №1 в США с более
                чем 10 миллионами пользователей. В начале этого года я покинул
                Replika, чтобы вывести последние достижения в области
                разговорного ИИ на новый уровень.
              </p>
              <h3 className={`${styles.boldHeader}`}>Польза продукта</h3>
              <p className={styles.text}>
                За последние 7 лет я создал самый передовой в мире разговорный
                ИИ с открытым доменом для Replika - чат-бота №1 в США с более
                чем 10 миллионами пользователей. В начале этого года я покинул
                Replika, чтобы вывести последние достижения в области
                разговорного ИИ на новый уровень.
              </p>
              <div></div>
              <h3 className={`${styles.boldHeader}`}>Мнения экспертов</h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
