import React, { useContext } from 'react';

import { Link } from 'react-router-dom';
import { HomeFilled } from '@ant-design/icons';

import AppContext from '../../store/app-context.js';
import classes from './MainNavigation.module.css';
import { Badge } from 'antd';

function MainNavigation() {
  const appCtx = useContext(AppContext);
  const totalFavorites = appCtx.totalFavorites;

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Herolo Weather App</div>
      <nav>
        <ul>
          <li>
            <HomeFilled />
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/favorites'>Favorites</Link>
          </li>
          <Badge count={totalFavorites}></Badge>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
