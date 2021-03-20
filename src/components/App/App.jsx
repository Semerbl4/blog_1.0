import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { BrowserRouter, Route } from 'react-router-dom';

// import { Alert } from 'antd';

import * as actions from '../../redux/actions';

import appStyle from './App.module.scss';

import Routes from '../Routes/Routes';

import 'antd/dist/antd.css';

const App = ({
  // errorGetArticlesForPage,
  logedUser,
  setLogedUser,
}) => {
  useEffect(() => {
    if (Object.keys(logedUser.user).length !== 0) {
      localStorage.setItem('storageUser', JSON.stringify(logedUser));
    }
    if (Object.keys(logedUser.user).length === 0 && !!localStorage.getItem('storageUser')) {
      let extractedStorageUse = localStorage.getItem('storageUser');
      extractedStorageUse = JSON.parse(extractedStorageUse);
      setLogedUser(extractedStorageUse);
    }
  }, [logedUser, setLogedUser]);

  return (
    <div className={appStyle.container}>
      <Routes />
    </div>
  );
};

App.propTypes = {
  // errorGetArticlesForPage: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  logedUser: PropTypes.object.isRequired,
  setLogedUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  articles: state.mainReducer.articles,
  logedUser: state.logedUserReducer,
});

export default connect(mapStateToProps, actions)(App);
