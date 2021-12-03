import React from 'react';
import HeaderBase from '../../components/HeaderBase/HeaderBase';
import styles from './AuthPage.module.css';

export default function AuthPage() {
  return (
    <div className={styles.mainGrid}>
      <HeaderBase />
      <div className={styles.carouselContainer}>
        <h2>Находите интересные проекты для реализации в несколько кликов</h2>
        <img src='' alt='Screenshot 1' />
      </div>
      <div className={styles.authFormContainer}></div>
    </div>
  );
}
