import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import { Alert } from 'antd';

import * as actions from '../../redux/actions';

import appStyle from './App.module.scss';

import Header from '../Header/Header';
import ArticleList from '../ArticleList/ArticleList';
// import Article from '../Article/Article';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import EditProfile from '../EditProfile/EditProfile';
import CreateArticle from '../CreateArticle/CreateArticle';
import OpenedArticle from '../OpenedArticle/OpenedArticle';
import EditArticle from '../EditArticle/EditArticle';

import 'antd/dist/antd.css';

const App = ({ errorGetArticlesForPage, logedUser, setLogedUser }) => {
  useEffect(() => {
    if (Object.keys(logedUser.user).length !== 0) {
      localStorage.setItem('storageUser', JSON.stringify(logedUser));
      // console.log(localStorage);
    }
    if (Object.keys(logedUser.user).length === 0 && !!localStorage.getItem('storageUser')) {
      let extractedStorageUse = localStorage.getItem('storageUser');
      extractedStorageUse = JSON.parse(extractedStorageUse);
      // console.log(extractedStorageUse);
      setLogedUser(extractedStorageUse);
    }
  }, [logedUser, setLogedUser]);

  return (
    <div className={appStyle.container}>
      <BrowserRouter>
        <Route path="/" component={Header} />
        <Route
          exact
          path={['/', '/articles']}
          render={() => {
            if (errorGetArticlesForPage) {
              return (
                <Alert message="Ошибка" description="Не удалось получить статьи с сервера" type="error" showIcon />
              );
            }
            return <ArticleList />;
          }}
        />
        <Route exact path="/atricles/:slug" component={OpenedArticle} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/profile" component={EditProfile} />
        <Route exact path="/new-article" component={CreateArticle} />
        <Route exact path="/articles/:slug/edit" component={EditArticle} />
      </BrowserRouter>
    </div>
  );
};

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  // articles: PropTypes.array.isRequired,
  errorGetArticlesForPage: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  logedUser: PropTypes.object.isRequired,
  setLogedUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  articles: state.mainReducer.articles,
  errorGetArticlesForPage: state.errReducer.errorGetArticlesForPage,
  logedUser: state.logedUserReducer,
});

export default connect(mapStateToProps, actions)(App);
