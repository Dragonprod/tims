/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import styles from './HeaderBase.module.css';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';

export default function HeaderBase() {
    return (
        <header className={styles.upperMenuHeader}>
            <Link className={styles.upperMenuLogo} to='/'>
                <Logo className={styles.upperMenuLogo} />
            </Link>
        </header>
    );
}
