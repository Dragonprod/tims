/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import styles from './ProjectDescription.module.css';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from '@mui/material/Button';
import StartupImg1 from '../../assets/images/1.jpg';
import StartupImg2 from '../../assets/images/2.jpg';
import StartupImg3 from '../../assets/images/3.jpg';

export default function ProjectDescription(props) {
  return (
    <div className={styles.darkBackground}>
      <div className={styles.projectDescriptionCard}>
        <div className={styles.topIconsContainer}></div>
      </div>
    </div>
  );
}
