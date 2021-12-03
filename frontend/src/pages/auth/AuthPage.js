import React, { useEffect, useState } from 'react';
import HeaderBase from '../../components/HeaderBase/HeaderBase';
import styles from './AuthPage.module.css';
import { connect } from 'react-redux';
import { setFormData } from '../../store/dataStorage/actions';
import SlideBase from '../../assets/images/slide_base.png';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import API from '../../api/api';
import { useNavigate } from 'react-router-dom';
import parseJwt from '../../services/jwt';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function AuthPage() {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(false);
  };

  const handleChangeEmail = e => {
    setEmail(e.target.value);
  };

  const handleChangePassword = e => {
    setPassword(e.target.value);
  };

  const loginProccess = async e => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    const res = await API.post(`users/login`, data);

    if (res.data.status_code === 401) setError(true);

    if (!error)
      try {
        const jwt = parseJwt(res.data.token);
        if (jwt.is_admin === true) navigate('/admin');
        else if (jwt.is_admin === false) navigate('/showcases');
      } catch (e) {
        console.log(e);
      }
  };
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
                onChange={handleChangeEmail}
              />
            </div>
            <div className={styles.authFormInputDiv}>
              <TextField
                className={styles.authFormPassword}
                type='password'
                label='Пароль'
                variant='outlined'
                onChange={handleChangePassword}
              />
            </div>
            <p>Забыли пароль?</p>
            <Button
              className={styles.muiLoginButton}
              variant='contained'
              onClick={loginProccess}>
              Искать
            </Button>
            <p>или</p>
            <Button className={styles.muiGoogleLoginButton} variant='outlined'>
              Войти с помощью Google
            </Button>
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={error}
              autoHideDuration={3000}
              onClose={handleClose}>
              <Alert
                severity='error'
                onClose={handleClose}
                sx={{ width: '100%' }}>
                <AlertTitle>Ошибка</AlertTitle>
                Проверьте — <strong>логин или пароль!</strong>
              </Alert>
            </Snackbar>
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
