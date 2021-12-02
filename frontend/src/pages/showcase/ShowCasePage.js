import React from 'react';
import AsideMenu from '../../components/AsideMenu/AsideMenu';
import Header from '../../components/Menu/Header';
import styles from './ShowCasePage.module.css';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ShowCasePage() {
  const [age, setAge] = React.useState('');

  const handleChange = event => {
    setAge(event.target.value);
  };

  return (
    <div className={styles.mainGrid}>
      <Header />
      <h2 className={`${styles.boldHeader} ${styles.categoryHeader}`}>
        Категория:
      </h2>
      <div className={`${styles.boldHeader} ${styles.solutionsHeader}`}>
        <h2 className={styles.boldHeader}>Все решения</h2>
        <span className={styles.lightCounter}>250</span>
      </div>
      <div className={`${styles.boldHeader} ${styles.favouritesHeader}`}>
        <h2 className={styles.boldHeader}>Избранное</h2>
        <span className={styles.lightCounter}>12</span>
      </div>

      <FormControl
        className={`${styles.boldHeader} ${styles.selectHeader}`}
        sx={{ m: 1, minWidth: 80 }}>
        <Select
          labelId='demo-simple-select-autowidth-label'
          id='demo-simple-select-autowidth'
          value={age}
          onChange={handleChange}
          autoWidth
          label='Age'
          inputProps={{ 'aria-label': 'Without label' }}>
          <MenuItem value={20}>Сначала новые</MenuItem>
          <MenuItem value={21}>Сначала старые</MenuItem>
          <MenuItem value={22}>Сначала популярные</MenuItem>
        </Select>
      </FormControl>

      <AsideMenu />
    </div>
  );
}
