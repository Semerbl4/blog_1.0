import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Spin, Alert } from 'antd';

import * as actions from '../../redux/actions';

import Article from '../Article/Article';

import 'antd/dist/antd.css';
import openedArticleStyles from './OpenedArticle.module.scss';

const OpenedArticle = ({ getArticle, clearArticle, match, article, notFound, unexpectedError }) => {
  // console.log(unexpectedError)

  useEffect(() => {
    clearArticle();
    // console.log(match.params.slug)
    getArticle(match.params.slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (Object.keys(article).length !== 0) {
    return (
      <Article
        createdAt={article.createdAt}
        title={article.title}
        favorited={article.favorited}
        favoritesCount={article.favoritesCount}
        tagList={article.tagList}
        description={article.description}
        author={article.author}
        slug={article.slug}
        body={article.body}
      />
    );
  }
  if (notFound) {
    return (
      <Alert message="Error 404" description="Article not found" type="error" className={openedArticleStyles.alert} />
    );
  }
  if (unexpectedError) {
    return (
      <Alert
        message={unexpectedError}
        description="Server respond with an error"
        type="error"
        className={openedArticleStyles.alert}
      />
    );
  }
  return <Spin id="spiner" size="large" className={openedArticleStyles.spiner} />;
};

OpenedArticle.propTypes = {
  getArticle: PropTypes.func.isRequired,
  clearArticle: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  article: PropTypes.object.isRequired,
  notFound: PropTypes.bool.isRequired,
  unexpectedError: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  article: state.openedArticleReducer.article,
  notFound: state.openedArticleReducer.notFound,
  unexpectedError: state.openedArticleReducer.unexpectedError,
});

export default withRouter(connect(mapStateToProps, actions)(OpenedArticle));
