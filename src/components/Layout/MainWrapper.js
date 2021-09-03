import React from 'react';

import classes from './MainWrapper.module.css';

function MainWrapper(props) {
  return <div className={classes.custom__styles}>{props.children}</div>;
}

export default MainWrapper;
