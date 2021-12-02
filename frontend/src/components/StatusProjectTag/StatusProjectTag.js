/* eslint-disable no-unused-vars */
import React from 'react';
import styles from '../StatusProjectTag/StatusProjectTag.module.css';

const styleAndProjectStatuses = {
  0: { "status": 'Поиск инвестора', "style": styles.default },
  1: { "status": 'Уточнение деталей', "style": styles.default },
  2: { "status": 'Подготовка к тестированию', "style": styles.default },
  3: { "status": 'Пилотное проектирование', "style": styles.default },
  4: { "status": 'Формирование отчёта', "style": styles.default },
  5: { "status": 'Готовое решение', "style": styles.ready },
  6: { "status": 'Приостановлен', "style": styles.stopped },
  7: { "status": 'Отменён', "style": styles.canceled },
  8: { "status": 'Закрыт', "style": styles.closed },
  9: { "status": 'Новое', "style": styles.new },
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
