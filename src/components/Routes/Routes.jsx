import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Alert } from 'antd';

import Header from '../Header/Header';
import ArticleList from '../ArticleList/ArticleList';
import OpenedArticle from '../OpenedArticle/OpenedArticle';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import EditProfile from '../EditProfile/EditProfile';
import CreateArticle from '../CreateArticle/CreateArticle';
import EditArticle from '../EditArticle/EditArticle';

const Routes = ({ errorGetArticlesForPage }) => (
  <BrowserRouter>
    <Route path="/" component={Header} />
    <Route
      exact
      path={['/', '/articles']}
      render={() => {
        if (errorGetArticlesForPage) {
          return <Alert message="Ошибка" description="Не удалось получить статьи с сервера" type="error" showIcon />;
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
);

Routes.propTypes = {
  errorGetArticlesForPage: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  errorGetArticlesForPage: state.errReducer.errorGetArticlesForPage,
});

export default connect(mapStateToProps)(Routes);
