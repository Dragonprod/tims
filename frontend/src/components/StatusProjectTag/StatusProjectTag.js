/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import styles from './StatusProjectTag.module.css';
import Card from '@mui/material/Card';

const projectStatuses = {
    0: "Поиск инвестора",
    1: "Уточнение деталей",
    2: "Подготовка к тестированию",
    3: "Пилотное проектирование",
    4: "Формирование отчёта",
    5: "Готовое решение",
    6: "Приостановлен",
    7: "Отменён",
    8: "Закрыт",
}
export default function StatusProjectTag(props) {
    const statusId = props.status;
    const statusText = projectStatuses[statusId]
    return (
        <div><h1>{statusText}</h1></div>
    );
}