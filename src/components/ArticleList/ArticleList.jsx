import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Pagination, Spin } from 'antd';

import Article from '../Article/Article';

import { getArticlesForPage } from '../../services/api';

import * as actions from '../../redux/actions';

import articleListStyle from './ArticleList.module.scss';
import 'antd/dist/antd.css';

const ArticleList = ({
  currentPage,
  articles,
  setPage,
  //  getArticlesForPage,
  articlesLoading,
  setArticlesLoading,
  setArticlesForPage,
  setErrGetArtForPage,
}) => {
  useEffect(() => {
    setArticlesLoading();
    getArticlesForPage(currentPage)
      .then((resp) => {
        console.log(resp);
        setArticlesLoading();
        setArticlesForPage(resp);
      })
      .catch(() => {
        setArticlesLoading();
        setErrGetArtForPage();
      });
  }, [currentPage, setArticlesLoading, setArticlesForPage, setErrGetArtForPage]);

  const createArticles = (stateArticles) => {
    const arrOfArticles = stateArticles.map((el) => (
      <li className={articleListStyle.article} key={el.slug}>
        <Article
          createdAt={el.createdAt}
          title={el.title}
          favorited={el.favorited}
          favoritesCount={el.favoritesCount}
          tagList={el.tagList}
          description={el.description}
          author={el.author}
          slug={el.slug}
        />
      </li>
    ));
    return arrOfArticles;
  };

  return (
    <div className={articleListStyle.container}>
      {articlesLoading && <Spin id="spiner" size="large" className={articleListStyle.spiner} />}
      <ul type="none" className={articleListStyle.articleList}>
        {articles.length > 0 && !articlesLoading && createArticles(articles)}
      </ul>
      {articles.length > 0 && !articlesLoading && (
        <Pagination
          className="pagination"
          defaultCurrent={currentPage}
          showSizeChanger={false}
          total={5000}
          onChange={(page) => {
            setPage(page);
          }}
        />
      )}
    </div>
  );
};

ArticleList.propTypes = {
  currentPage: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  articles: PropTypes.array.isRequired,
  setPage: PropTypes.func.isRequired,
  articlesLoading: PropTypes.bool.isRequired,
  setArticlesLoading: PropTypes.func.isRequired,
  setArticlesForPage: PropTypes.func.isRequired,
  setErrGetArtForPage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentPage: state.mainReducer.currentPage,
  articles: state.mainReducer.articles,
  articlesLoading: state.mainReducer.articlesLoading,
});

export default connect(mapStateToProps, actions)(ArticleList);
