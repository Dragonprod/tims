import React, { useState } from 'react';
import styles from './AsideMenu.module.css';

import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function AsideMenu() {
  const [open0, setOpen0] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);

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

      default:
        break;
    }

  };

  return (
    <div className={styles.asideMenuContainer}>
      <List
        className={styles.muiAsideMenu}
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'white' }}
        component='nav'
        aria-labelledby='nested-list-subheader'>
        <ListItemButton key='0' onClick={(event) => handleClick(event, 0)}>
          <ListItemText
            className={styles.listItemPrimary}
            primary='Городской транспорт'
          />
          {open0 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open0} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary='Метрополитен' />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary='Наземный транспорт' />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary='Обратная связь от горожан' />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary='Остановочные пункты' />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={(event) => handleClick(event, 1)}>
          <ListItemText
            className={styles.listItemPrimary}
            primary='Новые виды мобильности'
          />
          {open1 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open1} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary='Раздел 1' />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={(event) => handleClick(event, 2)}>
          <ListItemText
            className={styles.listItemPrimary}
            primary='Безопасность дорожного движения'
          />
          {open2 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open2} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary='Раздел 1' />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={(event) => handleClick(event, 3)}>
          <ListItemText
            className={styles.listItemPrimary}
            primary='Здоровые улицы и экология'
          />
          {open3 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open3} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary='Раздел 1' />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={(event) => handleClick(event, 4)}>
          <ListItemText
            className={styles.listItemPrimary}
            primary='Цифровые технологии в транспорте'
          />
          {open4 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open4} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary='Раздел 1' />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <Button className={styles.muiSearchButton} variant='contained'>
        Искать
      </Button>
      <Button className={styles.muiSubscribeButton} variant='outlined'>
        Подписаться на поиск
      </Button>
    </div>
  );
}
