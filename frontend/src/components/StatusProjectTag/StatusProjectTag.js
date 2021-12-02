/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import styles from '../StatusProjectTag/StatusProjectTag.module.css';
import Card from '@mui/material/Card';

const projectStatuses = {
  0: 'Поиск инвестора',
  1: 'Уточнение деталей',
  2: 'Подготовка к тестированию',
  3: 'Пилотное проектирование',
  4: 'Формирование отчёта',
  5: 'Готовое решение',
  6: 'Приостановлен',
  7: 'Отменён',
  8: 'Закрыт',
};

const stylesStauses = {
  "new": styles.new,
  "default": styles.default,
  "ready": styles.ready,
  "stopped": styles.stopped,
  "canceled": styles.canceled,
  "closed": styles.closed
};

export default function StatusProjectTag(props) {
  const statusId = props.status;
  const type = props.type;
  const statusText = projectStatuses[statusId];
  return (
    <span className={`${styles.statusProjectTag} ${stylesStauses[type]}`}>
      {statusText}
    </span>
  );
}
