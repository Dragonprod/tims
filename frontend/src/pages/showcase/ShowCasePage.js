import React from 'react';
import AsideMenu from '../../components/AsideMenu/AsideMenu';
import Header from '../../components/Menu/Header';
import styles from './ShowCasePage.module.css';

export default function ShowCasePage() {
  return (
    <div className={styles.mainGrid}>
      <Header />
      <h2 className={styles.mainHeader}>Категория:</h2>
      <AsideMenu />
    </div>
  );
}
