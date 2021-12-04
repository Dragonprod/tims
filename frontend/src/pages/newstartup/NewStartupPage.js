/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import AsideMenu from '../../components/AsideMenu/AsideMenu';
import Header from '../../components/Menu/Header';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import styles from './NewStartupPage.module.css';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import API from '../../api/api';
import StatusProjectTag from '../../components/StatusProjectTag/StatusProjectTag';
import ThemeProjectTag from '../../components/ThemeProjectTag/ThemeProjectTag';
import Button from '@mui/material/Button';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import Img1 from '../../assets/images/1.jpg';
import Img2 from '../../assets/images/2.jpg';

export default function NewStartupPage() {
  const [companyDescriptionActive, setrcompanyDescriptionActive] =
    useState(true);
  const [projectDescriptionActive, setrprojectDescriptionActive] =
    useState(false);
  const [accRequestActive, seaccRequestActive] = useState(false);

  const handleCompanyDescriptionTabIsClicked = () => {
    setrcompanyDescriptionActive(true);
    setrprojectDescriptionActive(false);
    seaccRequestActive(false);
  };

  const handleProjectDescriptionTabIsClicked = () => {
    setrcompanyDescriptionActive(false);
    setrprojectDescriptionActive(true);
    seaccRequestActive(false);
  };

  const handleAccRequestTabIsClicked = () => {
    setrcompanyDescriptionActive(false);
    setrprojectDescriptionActive(false);
    seaccRequestActive(true);
  };

  useEffect(() => {
    const getUserDetails = async () => {};
    getUserDetails();
  }, []);

  return (
    <div className={styles.mainGrid}>
      <Header />
      <div className={styles.headerContainer}>
        <h2 className={styles.requestFormHeader}>Форма заявки</h2>
        {/* <span className={styles.upperHeaderSteps}>шаг 1 из 3 </span> */}
      </div>
      <div className={styles.requestFormContainer}>
        <div className={styles.upperHeaderTabs}>
          <h3
            className={`${styles.boldHeader} ${styles.profileHeader} ${
              companyDescriptionActive === true
                ? styles.profileHeaderActive
                : ''
            }`}
            onClick={handleCompanyDescriptionTabIsClicked}>
            Описание организации
          </h3>
          <h3
            className={`${styles.boldHeader} ${styles.myStartupsHeader} ${
              projectDescriptionActive === true
                ? styles.myStartupsHeaderActive
                : ''
            }`}
            onClick={handleProjectDescriptionTabIsClicked}>
            Описание проекта
          </h3>
          <h3
            className={`${styles.boldHeader} ${styles.mySubscribesHeader} ${
              accRequestActive === true ? styles.mySubscribesHeaderActive : ''
            }`}
            onClick={handleAccRequestTabIsClicked}>
            Запрос к акселератору
          </h3>
        </div>
        <div className={`${styles.requestForm}`}>
          {companyDescriptionActive && (
            <>
              <h3 className={`${styles.smallSectionHeader}`}>
                Контактное лицо
              </h3>
              <div className={`${styles.firstLine}`}>
                <TextField
                  className={styles.input}
                  id='outlined-basic'
                  label='Имя и отчество'
                  variant='outlined'
                />
                <TextField
                  className={styles.input}
                  id='outlined-basic'
                  label='Фамилия'
                  variant='outlined'
                />
                <TextField
                  className={styles.input}
                  id='outlined-basic'
                  label='Должность контактного лица'
                  variant='outlined'
                />
                <TextField
                  className={styles.input}
                  id='outlined-basic'
                  label='Сайт'
                  variant='outlined'
                />
                <TextField
                  className={styles.input}
                  id='outlined-basic'
                  label='Номер телефона'
                  variant='outlined'
                />
                <TextField
                  className={styles.input}
                  id='outlined-basic'
                  label='E-mail'
                  variant='outlined'
                />
              </div>
              <h3 className={`${styles.smallSectionHeader}`}>Об организации</h3>
              <div className={`${styles.secondLine}`}>
                <TextField
                  className={styles.input}
                  id='outlined-basic'
                  label='Наименование команды/организации'
                  variant='outlined'
                />
                <TextField
                  className={styles.input}
                  id='outlined-basic'
                  label='Юридическое лицо'
                  variant='outlined'
                />
                <TextField
                  className={styles.input}
                  id='outlined-basic'
                  label='ИНН'
                  variant='outlined'
                />
                <TextField
                  className={styles.input}
                  id='outlined-basic'
                  label='Сколько человек в организации'
                  variant='outlined'
                />
              </div>
            </>
          )}
          {projectDescriptionActive && (
            <>
              <h3 className={`${styles.smallSectionHeader}`}>О продукте</h3>
              <div className={`${styles.firstLine}`}>
                <TextField
                  className={styles.input}
                  id='outlined-basic'
                  label='Стадия готовности продукта'
                  variant='outlined'
                />
                <TextField
                  className={styles.input}
                  id='outlined-basic'
                  label='Для какой сферы продукт'
                  variant='outlined'
                />
              </div>
              <h3 className={`${styles.smallSectionHeader}`}>Описание</h3>
              <div className={`${styles.secondLine}`}>
                <TextField
                  className={`${styles.input} ${styles.inputBig}`}
                  id='outlined-basic'
                  label='Краткое описание продукта'
                  variant='outlined'
                />
                <TextField
                  className={`${styles.input} ${styles.inputBig}`}
                  id='outlined-basic'
                  label='Кейсы использования продукта'
                  variant='outlined'
                />
                <TextField
                  className={`${styles.input} ${styles.inputBig}`}
                  id='outlined-basic'
                  label='Польза продукта'
                  variant='outlined'
                />
              </div>
            </>
          )}
          {accRequestActive && (
            <>
              <h3 className={`${styles.smallSectionHeader}`}>
                Дополнительная информация
              </h3>
              <div className={`${styles.firstLine}`}>
                <TextField
                  className={styles.input}
                  id='outlined-basic'
                  label='Откуда узнали про акселератор'
                  variant='outlined'
                />
                <TextField
                  className={styles.input}
                  id='outlined-basic'
                  label='Видение пилотного проекта'
                  variant='outlined'
                />
              </div>
              <h3 className={`${styles.smallSectionHeader}`}>Файлы</h3>
              <p className={`${styles.warning}`}>
                Обязательно прикрепите презентацию
              </p>
              <div className={`${styles.secondLine}`}>
                <AttachFileIcon />
                <span className={`${styles.attach}`}>1. Сертификат</span>
                <span className={`${styles.attach}`}>
                  2. Условия проведения...
                </span>
                <span className={`${styles.attach}`}>3. Презентация.ppt</span>
              </div>
              <Button
                className={`${styles.muiAddFileButton}`}
                startIcon={<AddCircleOutlineIcon />}
                variant='outlined'>
                Добавить файл
              </Button>
              <br />
              <br />
              <br />
              <br />
              <h3 className={`${styles.smallSectionHeader}`}>Медиафайлы</h3>
              <p className={`${styles.warning}`}>
                mp4, JPG, JPEG, PNG не более 10 Mb
              </p>
              <img className={`${styles.smallImg}`} src={Img1} alt='' />
              <img className={`${styles.smallImg}`} src={Img2} alt='' />
              <br />
              <br />
              <Button
                className={`${styles.muiAddFileButton}`}
                startIcon={<AddCircleOutlineIcon />}
                variant='outlined'>
                Добавить файл
              </Button>
            </>
          )}
        </div>
        <div className={styles.lowerStepButtons}>
          <Button className={styles.muiCancelButton} variant='text'>
            Отменить
          </Button>
          <Button className={`${styles.muiNextButton}`} variant='contained'>
            Продолжить
          </Button>
        </div>
      </div>
    </div>
  );
}
