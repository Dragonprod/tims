/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import styles from './Tag.module.css';
import Card from '@mui/material/Card';

const statuses = {
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
export default function Tag(props) {
    const statusId = props.status;
    const statusText = statuses[statusId]
    return (
        <div><h1>{statusText}</h1></div>
    );
}