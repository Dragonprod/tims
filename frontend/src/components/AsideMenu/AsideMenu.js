import React from 'react';
import styles from './AsideMenu.module.css';

import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function AsideMenu() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.asideMenuContainer}>
      <List
        className={styles.muiAsideMenu}
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'white' }}
        component='nav'
        aria-labelledby='nested-list-subheader'>
        <ListItemButton onClick={handleClick}>
          <ListItemText
            className={styles.listItemPrimary}
            primary='Городской транспорт'
          />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout='auto' unmountOnExit>
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
        <ListItemButton onClick={handleClick}>
          <ListItemText
            className={styles.listItemPrimary}
            primary='Новые виды мобильности'
          />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary='Раздел 1' />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={handleClick}>
          <ListItemText
            className={styles.listItemPrimary}
            primary='Безопасность дорожного движения'
          />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary='Раздел 1' />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={handleClick}>
          <ListItemText
            className={styles.listItemPrimary}
            primary='Здоровые улицы и экология'
          />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary='Раздел 1' />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={handleClick}>
          <ListItemText
            className={styles.listItemPrimary}
            primary='Цифровые технологии в транспорте'
          />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout='auto' unmountOnExit>
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
