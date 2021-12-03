import React from 'react';
import { connect } from "react-redux";
import { setFormData } from "../../store/dataStorage/actions";
import HeaderBase from '../../components/HeaderBase/HeaderBase';
import styles from './AuthPage.module.css';
import SlideBase from "../../assets/images/slide_base.png";

function AuthPage() {
  return (
    <div className={styles.mainGrid}>
      <HeaderBase />
      <div className={styles.carouselContainer}>
        <h2>Находите интересные проекты для реализации в несколько кликов</h2>
        <img src={SlideBase} alt='Screenshot 1' />
      </div>
      <div className={styles.authFormContainer}></div>
    </div>
  );
}

const mapDispatchToProps = {
  setFormData,
};

export default connect(null, mapDispatchToProps)(AuthPage);