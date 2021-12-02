/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import styles from './ProjectCard.module.css';
import Card from '@mui/material/Card';

export default function Tag(props) {
    const status = props;

    return (
        <Card variant="outlined"><h1>Tag</h1></Card>
    );
}