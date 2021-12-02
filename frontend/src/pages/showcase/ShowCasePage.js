import React, { useState, useEffect } from 'react';
import AsideMenu from '../../components/AsideMenu/AsideMenu';
import Header from '../../components/Menu/Header';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import styles from './ShowCasePage.module.css';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import API from '../../api/api';

export default function ShowCasePage() {
  const [startupsCount, setstartupsCount] = useState(0);
  const [favouritesStartupsCount, setfavouritesStartupsCount] = useState(0);
  const [searchValue, setsearchValue] = useState(0);
  const [page, setPage] = useState(1);

  // useEffect(() => {
  //   const getStartupsData = async () => {
  //     const startupsResponse = await API.get("/startup");
  //     setstartupsCount(startupsResponse.data.startups.length);
  //   };

  //   getStartupsData();
  // }, []);

  const handleChange = event => {
    setsearchValue(event.target.value);
  };

  const handlePageChange = value => {
    setPage(value);
  };

  return (
    <div className={styles.mainGrid}>
      <Header />
      <h2 className={`${styles.boldHeader} ${styles.filtersHeader}`}>
        Фильтры:
      </h2>
      <div className={`${styles.boldHeader} ${styles.solutionsHeader}`}>
        <h2 className={styles.boldHeader}>Все решения</h2>
        <span className={styles.lightCounter}>{startupsCount}</span>
      </div>
      <div className={`${styles.boldHeader} ${styles.favouritesHeader}`}>
        <h2 className={styles.boldHeader}>Избранное</h2>
        <span className={styles.lightCounter}>{favouritesStartupsCount}</span>
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
      <AsideMenu />
      <div className={styles.projectCardsGrid}>
        <ProjectCard
          name='Программное обеспечение для анализа транспортных потоков по видео'
          description='Технология мониторинга может применяться как для учёта транспортных потоков, так и для адаптивного регулирования перекрёстков. Система способна определять ДТП, занятость парковочных мест, контролировать соблюдение правил дорожного движения.'
          reviewCount={11}
          avgMark={5.6}
          createdTime={'02.12.2021'}
        />
      </div>
      <div className={styles.projectCardsPagination}>
        <div className={styles.projectCardsPaginationTextContainer}>
          <span className={styles.projectCardsAmount}>29 результатов</span>
          <div className={styles.selectProjectCardsAmountContainer}>
            <span>Показать:</span>
            <FormControl
              className={styles.projectCardsAmountSelect}
              sx={{ m: 1, minWidth: 80 }}>
              <Select
                labelId='demo-simple-select-autowidth-label'
                id='demo-simple-select-autowidth'
                value={searchValue}
                onChange={handleChange}
                autoWidth
                label='SearchValue'
                inputProps={{ 'aria-label': 'Without label' }}>
                <MenuItem value={0}>10</MenuItem>
                <MenuItem value={1}>20</MenuItem>
                <MenuItem value={2}>30</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        <Pagination
          className={styles.muiPagination}
          count={10}
          page={page}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}
