import React, { useState } from 'react';
import styles from './AsideMenu.module.css';

import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Divider } from '@mui/material';

const statuses = [
  'Поиск инвестора',
  'Уточнение деталей',
  'Подготовка к тестированию',
  'Пилотное тестирование',
  'Формирование отчета',
  'Готовое решение',
  'Приостановлен',
  'Отменён',
  'Закрыт',
  'Новый',
];

const categories = {
  'Городской транспорт': [
    'Метрополитен',
    'Наземный транспорт',
    'Остановочные пункты',
    'Обратная связь',
  ],
  'Новые виды мобильности': [
    'Зарядная инфраструктура',
    'Водный транспорт',
    'Беспилотный транспорт',
    'Перевозки',
  ],
  'Безопасность дорожного движения': [
    'Анализ  ДТП',
    'Безопасность моторанспорта',
    'Снижение наездов на пешеходов вне пешеходных переходов, во дворах и вблизи школ(ХЗ)',
    'Безопасность каршеринга',
    'Борьба с превышением скорости',
    'Оптимизация кол-ва транспорта',
    'Безопасность пешеходов',
    'Оптимизация парковки',
  ],
  'Здоровые улицы и экология': [
    'Велопешеходная инфраструктура',
    'Электротранспорт',
    'Пешеходы',
    'Экологическая ситуация',
  ],
  'Цифровые технологии в транспорте': [
    'Оценка парк. мест',
    'Совместные поездки',
    'Подписки на поездки',
    'Планирование маршрута',
    'MaaS',
    'Аналитика транспорта',
    'Беспилотный наземный транспорт',
    'Эко маршруты',
  ],
};
export default function AsideMenu(props) {
  const renderSubscribeButton = props.render;
  const [open0, setOpen0] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);

  const handleClick = (event, value) => {
    switch (value) {
      case 0:
        setOpen0(!open0);
        break;
      case 1:
        setOpen1(!open1);
        break;
      case 2:
        setOpen2(!open2);
        break;
      case 3:
        setOpen3(!open3);
        break;
      case 4:
        setOpen4(!open4);
        break;
      case 5:
        setOpen5(!open5);
        break;

      default:
        break;
    }
  };

  return (
    <div className={styles.asideMenuContainer}>
      <List
        className={styles.muiAsideMenu}
        sx={{ width: '100%', maxWidth: 500, bgcolor: 'transparent' }}
        component='nav'
        aria-labelledby='nested-list-subheader'>
        <ListItemButton key='0' onClick={event => handleClick(event, 0)}>
          <ListItemText className={styles.listItemPrimary} primary='Статусы' />
          {open0 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Divider />
        <Collapse in={open0} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {statuses.map(status => (
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary={status} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
        <ListItemButton onClick={event => handleClick(event, 1)}>
          <ListItemText
            className={styles.listItemPrimary}
            primary='Городской транспорт'
          />
          {open1 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Divider />
        <Collapse in={open1} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {categories['Городской транспорт'].map(category => (
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary={category} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
        <ListItemButton onClick={event => handleClick(event, 2)}>
          <ListItemText
            className={styles.listItemPrimary}
            primary='Новые виды мобильности'
          />
          {open2 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Divider />
        <Collapse in={open2} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {categories['Новые виды мобильности'].map(category => (
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary={category} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
        <ListItemButton onClick={event => handleClick(event, 3)}>
          <ListItemText
            className={styles.listItemPrimary}
            primary='Безопасность дорожного движения'
          />
          {open3 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Divider />
        <Collapse in={open3} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {categories['Безопасность дорожного движения'].map(category => (
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary={category} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
        <ListItemButton onClick={event => handleClick(event, 4)}>
          <ListItemText
            className={styles.listItemPrimary}
            primary='Здоровые улицы и экология'
          />
          {open4 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Divider />
        <Collapse in={open4} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {categories['Здоровые улицы и экология'].map(category => (
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary={category} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
        <ListItemButton onClick={event => handleClick(event, 5)}>
          <ListItemText
            className={styles.listItemPrimary}
            primary='Цифровые технологии в транспорте'
          />
          {open5 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Divider />
        <Collapse in={open5} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {categories['Цифровые технологии в транспорте'].map(category => (
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary={category} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </List>
      <Button className={styles.muiSearchButton} variant='contained'>
        Искать
      </Button>
      {renderSubscribeButton && (
        <Button className={styles.muiSubscribeButton} variant='outlined'>
          Подписаться на поиск
        </Button>
      )}
    </div>
  );
}
