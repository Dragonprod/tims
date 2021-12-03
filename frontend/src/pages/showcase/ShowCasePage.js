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
import StatusProjectTag from '../../components/StatusProjectTag/StatusProjectTag';
import ThemeProjectTag from '../../components/ThemeProjectTag/ThemeProjectTag';

function rebuildData(date) {
  const dateArray = date.split('-');
  return `${dateArray[2]}.${dateArray[1]}.${dateArray[0]}`;
}

function renderStatuses(statuses) {
  return statuses.map(status =>
    statuses === [] ? (
      <StatusProjectTag status={0} />
    ) : (
      <StatusProjectTag status={status.id} />
    )
  );
}

function renderThemes(categories) {
  return categories.id === undefined
    ? [<ThemeProjectTag theme={0} />, <ThemeProjectTag theme={0} />]
    : [
      <ThemeProjectTag theme={categories[0].id} />,
      <ThemeProjectTag theme={categories[0].children[0].id} />,
    ];
}

function renderStartups(startups, amount, page) {
  let startupsComponents = []

  for(let i = 0; i < amount; i++) {
    startupsComponents.push(
      <ProjectCard
            name={startups[i].name}
            description={startups[i].description}
            reviewCount={11}
            avgMark={5.6}
            createdTime={rebuildData(startups[i].date)}
            statusTags={renderStatuses(startups[i].statuses)}
            themeTags={renderThemes(startups[i].categories)}
          />
    )
  }
}
export default function ShowCasePage() {
  const [startupData, setstartupData] = useState([]);
  const [favouritesStartupsCount, setfavouritesStartupsCount] = useState(0);
  const [searchValue, setsearchValue] = useState(0);
  const [rowValue, setrowValue] = useState(10);
  const [page, setPage] = useState(1);

  const [solutionTabIsClicked, setsolutionTabIsClicked] = useState(true);
  const [favouritesTabIsClicked, setfavouritesTabIsClicked] = useState(false);

  const handleSolutionTabIsClicked = () => {
    setsolutionTabIsClicked(true);
    setfavouritesTabIsClicked(false);
  };

  const handleFavouriteTabIsClicked = () => {
    setsolutionTabIsClicked(false);
    setfavouritesTabIsClicked(true);
  };

  useEffect(() => {
    const getStartupsData = async () => {
      const startupsResponse = await API.get('/startup');
      setstartupData(startupsResponse.data.startups);
    };

    getStartupsData();
  }, []);

  const handleChange = event => {
    setsearchValue(event.target.value);
  };

  const handleChangeRowValue = event => {
    setrowValue(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startupsData = () => {
    switch (searchValue) {
      case 0:
          return 
        break;

      case 1:

        break;
      case 2:

        break;
      case 3:

        break;
      case 4:

        break;
      case 5:

        break;

      default:
        break;
    }
  }
  return (
    <div className={styles.mainGrid}>
      <Header />
      <h2 className={`${styles.boldHeader} ${styles.filtersHeader}`}>
        Фильтры:
      </h2>
      <div
        className={`${styles.boldHeader} ${styles.solutionsHeader} ${(solutionTabIsClicked === true) ? styles.solutionsHeaderActive : ''
          }`}
        onClick={handleSolutionTabIsClicked}>
        <h2 className={styles.boldHeader}>Все решения</h2>
        <span className={styles.lightCounter}>{startupData.length}</span>
      </div>
      <div
        className={`${styles.boldHeader} ${styles.favouritesHeader} ${(favouritesTabIsClicked === true) ? styles.favouritesHeaderActive : ''
          }`}
        onClick={handleFavouriteTabIsClicked}>
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
      <AsideMenu render={true} />
      <div className={styles.projectCardsGrid}>
        {solutionTabIsClicked && startupData.map(startup => (
          <ProjectCard
            name={startup.name}
            description={startup.description}
            reviewCount={11}
            avgMark={5.6}
            createdTime={rebuildData(startup.date)}
            statusTags={renderStatuses(startup.statuses)}
            themeTags={renderThemes(startup.categories)}
          />
        ))}

        {favouritesTabIsClicked && startupData.map(startup => (
          <ProjectCard
            name={startup.name}
            description={startup.description}
            reviewCount={11}
            avgMark={6}
            createdTime={rebuildData(startup.date)}
            statusTags={renderStatuses(startup.statuses)}
            themeTags={renderThemes(startup.categories)}
          />
        ))}

        {/* <ProjectCard
          name='Обогреваемые остановки наземного транспорта'
          description='Технология мониторинга может применяться как для учёта транспортных потоков, так и для адаптивного 
          регулирования перекрёстков. Система способна определять ДТП, занятость парковочных мест, 
          контролировать соблюдение правил дорожного движения.'
          reviewCount={11}
          avgMark={5.6}
          createdTime='03.13.2021'
          statusTags={[<StatusProjectTag status={0} />, <StatusProjectTag status={1} />]}
          themeTags={[<ThemeProjectTag theme={0} />, <ThemeProjectTag theme={1} />]}
        /> */}
      </div>
      <div className={styles.projectCardsPagination}>
        <div className={styles.projectCardsPaginationTextContainer}>
          <span className={styles.projectCardsAmount}>
            {startupData.length} результатов
          </span>
          <div className={styles.selectProjectCardsAmountContainer}>
            <span>Показать:</span>
            <FormControl
              className={styles.projectCardsAmountSelect}
              sx={{ m: 1, minWidth: 80 }}>
              <Select
                labelId='demo-simple-select-autowidth-label'
                id='demo-simple-select-autowidth'
                value={rowValue}
                onChange={handleChangeRowValue}
                autoWidth
                label='SearchValue'
                inputProps={{ 'aria-label': 'Without label' }}>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        <Pagination
          className={styles.muiPagination}
          count={
            startupData.length / rowValue >= 1
              ? Math.ceil(startupData.length / rowValue)
              : 1
          }
          page={page}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}
