/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import AsideMenu from '../../components/AsideMenu/AsideMenu';
import Header from '../../components/Menu/Header';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import styles from './AdminPage.module.css';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import API from '../../api/api';
import StatusProjectTag from '../../components/StatusProjectTag/StatusProjectTag';
import ThemeProjectTag from '../../components/ThemeProjectTag/ThemeProjectTag';
import ProjectCardForAdmin from '../../components/ProjectCardForAdmin/ProjectCardForAdmin';

export default function AdminPage() {
  const [searchValue, setsearchValue] = useState(0);
  const [applicationsData, setapplicationsData] = useState([])

  useEffect(() => {
    const getStartupsData = async () => {
      const startupsResponse = await API.get("/applications?user_id=2");
      setapplicationsData(startupsResponse.data.applications);
    };
    getStartupsData();
  }, []);

  const handleChange = event => {
    setsearchValue(event.target.value);
  };

  return (
    <div className={styles.mainGrid}>
      <Header />
      <h2 className={`${styles.boldHeader} ${styles.filtersHeader}`}>
        Фильтры:
      </h2>
      <div className={`${styles.boldHeader} ${styles.solutionsHeader}`}>
        <h2 className={styles.boldHeader}>Все решения</h2>
        <span className={styles.lightCounter}>{applicationsData.length}</span>
      </div>
      <FormControl
        className={`${styles.boldHeader} ${styles.selectHeader}`}
        sx={{ m: 1, minWidth: 80 }}>
        <Select
          labelId='demo-simple-select-autowidth-label'
          id='demo-simple-select-autowidth'
          value={searchValue}
          onChange={handleChange}
          autoWidth
          label='SearchValue'
          inputProps={{ 'aria-label': 'Without label' }}>
          <MenuItem value={0}>По дате добавления: Сначала новые</MenuItem>
          <MenuItem value={1}>По дате добавления: Сначала старые</MenuItem>
          <MenuItem value={2}>Оценки: По возрастанию</MenuItem>
          <MenuItem value={3}>Оценки: По убыванию</MenuItem>
          <MenuItem value={4}>Отзывы: Меньше 10</MenuItem>
          <MenuItem value={5}>Отзывы: Больше 10</MenuItem>
        </Select>
      </FormControl>
      <AsideMenu render={false} />
      <div className={styles.projectCardsGrid}>


        {applicationsData.map((startup) => (
          <ProjectCardForAdmin />
        ))}

      </div>
    </div>
  );
}
