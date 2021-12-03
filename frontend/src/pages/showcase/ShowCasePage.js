/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import AsideMenu from '../../components/AsideMenu/AsideMenu';
import Header from '../../components/Menu/Header';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import styles from './ShowCasePage.module.css';
import { connect } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import API from '../../api/api';
import StatusProjectTag from '../../components/StatusProjectTag/StatusProjectTag';
import ThemeProjectTag from '../../components/ThemeProjectTag/ThemeProjectTag';
import ProjectDescription from '../../components/ProjectDescription/ProjectDescription';
import localforage from 'localforage';

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

function renderStartups(startups, pageSize, pageNumber) {
  return startups.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}

function averageMark(reviews, id) {
  var sum = 0;
  for (let i = 0; i < reviews.length; i++)
    if (reviews[i].startup_id === id)
      sum += reviews[i].mark;

  return (sum / reviewsCount(reviews, id)) || 0
}

function reviewsCount(reviews, id) {
  let count = 0;
  for (let i = 0; i < reviews.length; i++)
    if (reviews[i].startup_id === id)
      count++;
  return count
}

function checkIsFavourite(id, favouriteStartups) {
  for (let j = 0; j < favouriteStartups.length; j++)
    if (id === favouriteStartups[j].id)
      return true;
  return false;
}

function addFavourites(favouriteStartupData, startupData, id) {
  return favouriteStartupData.push(startupData[id])
}

function deleteFavourites(favouriteStartupData, startupData, id) {
  return favouriteStartupData.filter(item => item !== startupData[id])
}

function ShowCasePage() {
  const [userId, setuserId] = useState(-1);

  const [startupData, setstartupData] = useState([]);
  const [favouriteStartupData, setfavouriteStartupData] = useState([]);
  const [favouriteStartupDataCount, setfavouriteStartupDataCount] = useState(0);
  const [startupReviewsData, setstartupReviewsData] = useState([]);

  const [searchValue, setsearchValue] = useState(0);
  const [rowValue, setrowValue] = useState(10);
  const [page, setPage] = useState(1);
  const [openDesc, setopenDesc] = useState(true);

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

  const handleMoreInfo = () => {
    setopenDesc(!openDesc);
  };

  const incrementCounter = () => {
    setfavouriteStartupDataCount((state) => (state + 1));
  }

  const decrementCounter = () => {
    setfavouriteStartupDataCount((state) => (state - 1));
  }

  const handleChange = async event => {
    setsearchValue(event.target.value);
    switch (event.target.value) {
      case 0: {
        const startupsResponse = await API.get('/startup?sort_date=DESC&offset=0&limit=2000');
        setstartupData(startupsResponse.data.startups);
      }
        break;
      case 1: {
        const startupsResponse = await API.get('/startup?sort_date=ASC&offset=0&limit=2000');
        setstartupData(startupsResponse.data.startups);
      }
        break;
      case 2: {
        const startupsResponse = await API.get('/startup?sort_mark=DESCC&offset=0&limit=2000');
        setstartupData(startupsResponse.data.startups);
      }
        break;
      case 3: {
        const startupsResponse = await API.get('/startup?sort_mark=ASC&offset=0&limit=2000');
        setstartupData(startupsResponse.data.startups);
      }
        break;

      default:
        break;
    }
  };

  const handleChangeRowValue = event => {
    setrowValue(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const addProjectToFavourites = id => {
    console.log(id)
    setfavouriteStartupData(addFavourites(favouriteStartupData, startupData, 0))
  }

  const deleteProjectToFavourites = id => {
    setfavouriteStartupData(deleteFavourites(favouriteStartupData, startupData, 0))
  }

  useEffect(() => {
    const getStartupsData = async () => {
      const startupsResponse = await API.get('/startup?sort_mark=DESC&offset=0&limit=2000');
      setstartupData(startupsResponse.data.startups);

      const userIdStorage = await localforage.getItem('user_id');
      setuserId(userIdStorage);

      const favouriteStartupsResponse = await API.get(`/user/favorites/${userIdStorage}`);
      setfavouriteStartupData(favouriteStartupsResponse.data.favorites_startup);
      setfavouriteStartupDataCount(favouriteStartupsResponse.data.favorites_startup.length)

      const startupsReviewsResponse = await API.get(`/reviews`)
      setstartupReviewsData(startupsReviewsResponse.data.reviews);

    };
    getStartupsData();
  }, []);

  return (
    <div className={styles.mainGrid}>
      <Header />
      <h2 className={`${styles.boldHeader} ${styles.filtersHeader}`}>
        Фильтры:
      </h2>
      <div
        className={`${styles.boldHeader} ${styles.solutionsHeader} ${solutionTabIsClicked === true ? styles.solutionsHeaderActive : ''
          }`}
        onClick={handleSolutionTabIsClicked}>
        <h2 className={styles.boldHeader}>Все решения</h2>
        <span className={styles.lightCounter}>{startupData.length}</span>
      </div>
      <div
        className={`${styles.boldHeader} ${styles.favouritesHeader} ${favouritesTabIsClicked === true ? styles.favouritesHeaderActive : ''
          }`}
        onClick={handleFavouriteTabIsClicked}>
        <h2 className={styles.boldHeader}>Избранное</h2>
        <span className={styles.lightCounter}>
          {favouriteStartupDataCount}
        </span>
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
      <ProjectDescription open={openDesc} onClick={handleMoreInfo} />
      <div className={styles.projectCardsGrid}>
        {solutionTabIsClicked &&
          renderStartups(startupData, rowValue, page).map(startup => (
            <ProjectCard
              id={startup.id}
              user_id={userId}
              name={startup.name}
              isFavourite={checkIsFavourite(startup.id, favouriteStartupData)}
              description={startup.description}
              reviewCount={reviewsCount(startupReviewsData, startup.id)}
              avgMark={averageMark(startupReviewsData, startup.id)}
              createdTime={rebuildData(startup.date)}
              statusTags={renderStatuses(startup.statuses)}
              themeTags={renderThemes(startup.categories)}
              onClick={handleMoreInfo}
              inc={incrementCounter}
              dec={decrementCounter}
            // addProjectToFavourites={addProjectToFavourites}
            // deleteProjectToFavourites={deleteProjectToFavourites}
            />
          ))}

        {favouritesTabIsClicked &&
          favouriteStartupData.length > 0 &&
          renderStartups(favouriteStartupData, rowValue, page).map(startup => (
            <ProjectCard
              id={startup.id}
              user_id={userId}
              name={startup.name}
              isFavourite={checkIsFavourite(startup.id, favouriteStartupData)}
              description={startup.description}
              reviewCount={reviewsCount(startupReviewsData, startup.id)}
              avgMark={averageMark(startupReviewsData, startup.id)}
              createdTime={rebuildData(startup.date)}
              statusTags={renderStatuses(startup.statuses)}
              themeTags={renderThemes(startup.categories)}
              onClick={handleMoreInfo}
              inc={incrementCounter}
              dec={decrementCounter}
              add={addProjectToFavourites}
              del={deleteProjectToFavourites}
            />
          ))}

        {favouritesTabIsClicked && favouriteStartupData.length === 0 && (
          <p>
            Вы пока не добавили ничего в избранное. Но это легко исправить, на
            платформе много новых проектов.
          </p>
        )}
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

const mapStateToProps = state => {
  return {
    inputData: state.dataStorage.forms,
  };
};

export default connect(mapStateToProps, null)(ShowCasePage);
