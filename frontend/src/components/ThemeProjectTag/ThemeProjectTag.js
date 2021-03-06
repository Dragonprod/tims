/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import styles from '../ThemeProjectTag/ThemeProjectTag.module.css';
import Card from '@mui/material/Card';

const projectThemes = {
  1: 'Городской транспорт',
  2: 'Метрополитен',
  3: 'Новые виды мобильности',
  4: 'Зарядная инфраструктура',
  5: 'Безопасность движения',
  6: 'Скоростной режим',
};

const projectThemesDict = {
  'Городской транспорт': [
    'Метрополитен',
    'Наземный транспорт',
    'Остановочные пункты',
    'Обратная связь',
  ],
  'Новые виды мобильности': [
    'Зарядная инфраструктура',
    'Водный транспорт',
    'Беспилотный транспорт',
    'Перевозки',
  ],
  'Безопасность дорожного движения': [
    'Анализ  ДТП',
    'Безопасность моторанспорта',
    'Снижение наездов на пешеходов вне пешеходных переходов, во дворах и вблизи школ',
    'Безопасность каршеринга',
    'Борьба с превышением скорости',
    'Оптимизация кол-ва транспорта',
    'Безопасность пешеходов',
    'Оптимизация парковки',
  ],
  'Здоровые улицы и экология': [
    'Велопешеходная инфраструктура',
    'Электротранспорт',
    'Пешеходы',
    'Экологическая ситуация',
  ],
  'Цифровые технологии в транспорте': [
    'Оценка парк. мест',
    'Совместные поездки',
    'Подписки на поездки',
    'Планирование маршрута',
    'MaaS',
    'Аналитика транспорта',
    'Беспилотный наземный транспорт',
    'Эко маршруты',
  ],
};

export default function ThemeProjectTag(props) {
  const themeId = props.theme;
  const parent = props.parent
  const child = props.child;
  const themeText = child === true ? projectThemesDict[parent][0] : projectThemes[themeId];
  return <span className={styles.themeProjectTag}>{themeText}</span>;
}
