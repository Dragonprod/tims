import React from 'react';
import HeaderBase from '../../components/HeaderBase/HeaderBase';
import styles from './AuthPage.module.css';
import { connect } from 'react-redux';
import { setFormData } from '../../store/dataStorage/actions';
import SlideBase from '../../assets/images/slide_base.png';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function AuthPage() {
  return (
    <div className={styles.mainGrid}>
      <HeaderBase />
      <div className={styles.carouselContainer}>
        <h2 className={styles.carouselTitle}>
          Находите интересные проекты для реализации в несколько кликов
        </h2>
        <img src='' alt='Screenshot 1' />
      </div>
      <div className={styles.authFormContainer}>
        <div className={styles.authFormBlock}>
          <div className={styles.authFormHeaderContainer}>
            <h2 className={`${styles.boldHeader} ${styles.loginHeader}`}>
              Вход
            </h2>
            <h2 className={`${styles.boldHeader} ${styles.signupHeader}`}>
              Регистрация
            </h2>
          </div>
          <p className={styles.authFormDescription}>
            Авторизируйтесь, чтобы иметь возможность просматривать проекты и
            добавлять свои
          </p>
          <form className={styles.authForm}>
            <div className={styles.authFormInputDiv}>
              <TextField
                className={styles.authFormEmail}
                label='E-mail'
                variant='outlined'
              />
            </div>
            <div className={styles.authFormInputDiv}>
              <TextField
                className={styles.authFormPassword}
                type='password'
                label='Пароль'
                variant='outlined'
              />
            </div>
            <p>Забыли пароль?</p>
            <Button className={styles.muiSearchButton} variant='contained'>
              Искать
            </Button>
            <p>или</p>
            <Button className={styles.muiSearchButton} variant='outlined'>
              Войти с помощью Google
            </Button>
          </form>
          Возникли проблемы с авторизацией? Обратитесь в службу поддержки
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  setFormData,
};

export default connect(null, mapDispatchToProps)(AuthPage);
