/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import styles from '../ThemeProjectTag/ThemeProjectTag.module.css';
import Card from '@mui/material/Card';

const projectThemes = {
  0: 'Городской транспорт',
  1: 'Метрополитен',
  2: 'Новые виды мобильности',
  3: 'Зарядная инфраструктура',
  4: 'Безопасность движения',
  5: 'Скоростной режим',
};
export default function ThemeProjectTag(props) {
  const themeId = props.status;
  const themeText = projectThemes[themeId];
  return (
    <div>
      <h1>{themeText}</h1>
    </div>
  );
}
