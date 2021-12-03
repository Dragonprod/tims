/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
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
import CommentCard from '../CommentCard/CommentCard';

export default function ProjectDescription(props) {
  const onClickOpen = props.onClickOpen;
  const onClickClose = props.onClickClose

  const [isFavourite, setisFavourite] = useState(false);
  const [open, setopen] = useState(false);

  const imagesSrc = [StartupImg1, StartupImg2, StartupImg3];
  const [primaryImageSrc, setprimaryImageSrc] = useState(StartupImg1);

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [patronymic, setPatronymic] = useState('')
  const [position, setPosition] = useState('')

  const [reviews, setReviews] = useState([])

  const startup = props.startup;

  useEffect(() => {
    setopen(props.open);

    const getStartupData = async () => {

      const reviewsResponse = await API.get(`/startup/${startup.id}/reviews`);
      setReviews(reviewsResponse.data.reviews);
      console.log(reviewsResponse.data)

      const ownerDetailsResponse = await API.get(`/user/${startup.author}`)
      setName(ownerDetailsResponse.data.detail.first_name)
      setSurname(ownerDetailsResponse.data.detail.second_name)
      setPatronymic(ownerDetailsResponse.data.detail.patronymic)
      setPosition(ownerDetailsResponse.data.detail.position)
    };
    getStartupData();

  }, [props.open]);

  const likeProcess = async e => {
    e.preventDefault();
    setisFavourite(!isFavourite);
  };

  const changeImage = id => {
    switch (id) {
      case 0:
        setprimaryImageSrc(imagesSrc[0]);
        break;
      case 1:
        setprimaryImageSrc(imagesSrc[1]);
        break;
      case 2:
        setprimaryImageSrc(imagesSrc[2]);
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
                onClick={onClickClose}>
                <CloseIcon />
              </IconButton>
            </div>
            <div className={styles.imageBoxContainer}>
              <h3 className={`${styles.boldHeader}`}>
                {startup.name}
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
                Сведения о продукте
              </h3>
              <div className={styles.statsTable}>
                <div>
                  Статус: <StatusProjectTag status={startup.statuses[0].id} />{' '}
                </div>
                <div>
                  Категория: <ThemeProjectTag theme={startup.categories[0].id} /> <ThemeProjectTag theme={startup.categories[0].children[0].id} />{' '}
                </div>
                <div>
                  В организации: <span>{startup.company.count_workers}</span>
                </div>
                <div>
                  Сертификация: <span>{startup.sertificate ? "Требуется" : "Не требуется"}</span>
                </div>
                <div>Запрос к акселератору и видение пилотного проекта</div>
              </div>
              <h3 className={`${styles.boldHeader}`}>Описание продукта</h3>
              <p className={styles.text}>
                {startup.description}
              </p>
              <h3 className={`${styles.boldHeader}`}>
                Кейсы использования продукта
              </h3>
              <p className={styles.text}>
                {/* {startup.usecases} */}
              </p>
              <h3 className={`${styles.boldHeader}`}>Польза продукта</h3>
              <p className={styles.text}>
                {startup.usability}
              </p>
              <div className={styles.startuperCard}>
                <span className={styles.startuperPosition}>{position}</span>
                <a href='/' className={styles.startuperSite}>
                  www.startaper.ru
                </a>
                <span className={styles.startuperName}>
                  {name} {patronymic} {surname}
                </span>
                <Button className={styles.muiRequestButton} variant='contained'>
                  Отправить запрос
                </Button>
              </div>
              <h3 className={`${styles.boldHeader}`}>Мнения экспертов</h3>
              <div>
                {reviews.map((review) => (
                  <CommentCard _review={review} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
