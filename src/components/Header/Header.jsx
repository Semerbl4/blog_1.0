import React from 'react';
import { Link } from 'react-router-dom';

import HeaderRightSide from '../HeaderRightSide/HeaderRightSide';

import headerStyle from './Header.module.scss';

const Header = () => (
  <div className={headerStyle.container}>
    <Link to="/" className={headerStyle.linkToMain}>
      <div className={headerStyle.titleContainer} title="To the main page">
        <p className={headerStyle.title}>Realworld Blog</p>
      </div>
    </Link>
    <HeaderRightSide />
  </div>
);

export default Header;
