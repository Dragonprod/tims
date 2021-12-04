/* eslint-disable no-unused-vars */
import React from 'react';
import styles from '../StatusProjectTag/StatusProjectTag.module.css';

const styleAndProjectStatuses = {
  1: { "status": 'Поиск инвестора', "style": styles.default },
  2: { "status": 'Подготовка к тестированию', "style": styles.default },
  3: { "status": 'Пилотное проектирование', "style": styles.default },
}
export default function StatusProjectTag(props) {
  const statusId = props.status;
  const statusText = styleAndProjectStatuses[statusId].status;
  const statusStyle = styleAndProjectStatuses[statusId].style;
  return (
    <span className={`${styles.statusProjectTag} ${statusStyle}`}>
      {statusText}
    </span>
  );
}
