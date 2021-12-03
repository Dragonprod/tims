import React from 'react';
import HeaderBase from '../../components/HeaderBase/HeaderBase';
import styles from './AuthPage.module.css';

export default function AuthPage() {
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
          <h2>Вход</h2>
          <h2>Вход</h2>
        </div>
      </div>
    </div>
  );
}
