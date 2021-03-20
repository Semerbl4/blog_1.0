/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';

import { nanoid } from 'nanoid';

import { format } from 'date-fns';

import { Alert } from 'antd';

import cn from 'classnames';

import * as actions from '../../redux/actions';

import articleStyle from './Article.module.scss';

import { deleteArticle, postFavoriteArticle } from '../../services/api';

const Article = ({
  title,
  favoritesCount,
  description,
  author,
  createdAt,
  tagList,
  slug,
  body,
  logedUsername,
  // deleteArticle,
  match,
  token,
  errorDeleteArticle,
  deleteSucces,
  history,
  toogleShowDeleteConfirm,
  showConfirm,
  clearDeleteArticleReducer,
  favorited,
  setDeleteArticleSucces,
  setDeleteArticleErr,
}) => {
  const [userFavorited, setUserFavorited] = useState(favorited);
  const [userFavoritsCount, setUserFavotitsCount] = useState(favoritesCount);

  useEffect(() => {
    if (deleteSucces) {
      clearDeleteArticleReducer();
      history.push('/');
    }
  }, [history, deleteSucces, clearDeleteArticleReducer]);

  const likeButtonClasses = cn(articleStyle.likesButton, articleStyle.background, {
    [articleStyle.notLiked]: !userFavorited,
    [articleStyle.liked]: userFavorited,
  });
  const deleteBtnClasses = cn(articleStyle.buttonsCommon, articleStyle.btnDelete);
  const editBtnClasses = cn(articleStyle.buttonsCommon, articleStyle.btnEdit);

  const { slug: slugFromMatch } = match.params;

  const tags = () =>
    tagList.map((el) => (
      <li className={articleStyle.tag} key={nanoid()}>
        {el}
      </li>
    ));

  const articleDate = () => {
    let month = new Date(Date.parse(createdAt));
    month = format(month, 'LLLL d, y');
    return month;
  };

  const cutDescripton = () => description.split('').slice(0, 231).join('');

  // console.log(deleteArticle)

  return (
    <div className={articleStyle.article}>
      <div className={articleStyle.post}>
        {!!errorDeleteArticle && (
          <Alert
            message={`Error ${errorDeleteArticle}`}
            description="Unaible to delete an article. Try later."
            type="error"
            className={articleStyle.error}
          />
        )}
        <div className={articleStyle.titleContainer}>
          <Link to={`/atricles/${slug}`} className={articleStyle.linkToArticle}>
            <h1 className={articleStyle.title} title="To the article">
              {title}
            </h1>
          </Link>
          <div className={articleStyle.likesContainer}>
            <button
              type="button"
              disabled={!token}
              onClick={() => {
                postFavoriteArticle(slug, token, userFavorited);
                setUserFavorited((state) => !state);
                setUserFavotitsCount((state) => {
                  if (userFavorited) {
                    return state - 1;
                  }
                  return state + 1;
                });
              }}
              className={likeButtonClasses}
            />
            <p className={articleStyle.likesCount}>{userFavoritsCount}</p>
          </div>
        </div>
        <ul type="none" className={articleStyle.tags}>
          {tags()}
        </ul>
        <p className={articleStyle.content}>{cutDescripton()}</p>
        {body !== '' && (
          <p className={articleStyle.mainText}>
            <ReactMarkdown>{body}</ReactMarkdown>
          </p>
        )}
      </div>
      <div className={articleStyle.person}>
        <div className={articleStyle.personInfo}>
          <p className={articleStyle.personName}>{author.username}</p>
          <p className={articleStyle.personDate}>{articleDate()}</p>
        </div>
        <img className={articleStyle.avatar} src={author.image} alt="Avatar" />
      </div>
      {logedUsername === author.username && slugFromMatch && (
        <div className={articleStyle.buttonsContainer}>
          <button type="button" className={deleteBtnClasses} onClick={toogleShowDeleteConfirm}>
            Delete
          </button>
          {showConfirm && (
            <div className={articleStyle.confirmContainer}>
              <p className={articleStyle.confirmQuestion}>Are you sure to delete this article?</p>
              <div className={articleStyle.confirmBtnsContainer}>
                <button type="button" className={articleStyle.confirmBtnsCommon} onClick={toogleShowDeleteConfirm}>
                  No
                </button>
                <button
                  type="button"
                  className={articleStyle.confirmBtnsCommon}
                  onClick={() => {
                    deleteArticle(slug, token)
                      .then(() => setDeleteArticleSucces())
                      .catch((err) => setDeleteArticleErr(+err.message));
                  }}
                >
                  Yes
                </button>
              </div>
            </div>
          )}
          <Link to={`/articles/${slug}/edit`} className={editBtnClasses}>
            <p>Edit</p>
          </Link>
        </div>
      )}
    </div>
  );
};

Article.defaultProps = {
  body: '',
  logedUsername: '',
  token: '',
  match: {},
  history: {},
};

Article.propTypes = {
  title: PropTypes.string.isRequired,
  favoritesCount: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  author: PropTypes.object.isRequired,
  createdAt: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  tagList: PropTypes.array.isRequired,
  body: PropTypes.string,
  logedUsername: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object,
  token: PropTypes.string,
  // deleteArticle: PropTypes.func.isRequired,
  errorDeleteArticle: PropTypes.number.isRequired,
  deleteSucces: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object,
  toogleShowDeleteConfirm: PropTypes.func.isRequired,
  showConfirm: PropTypes.bool.isRequired,
  clearDeleteArticleReducer: PropTypes.func.isRequired,
  favorited: PropTypes.bool.isRequired,
  setDeleteArticleSucces: PropTypes.func.isRequired,
  setDeleteArticleErr: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  logedUsername: state.logedUserReducer.user.username,
  token: state.logedUserReducer.user.token,
  errorDeleteArticle: state.deleteArticleReducer.unexpectedError,
  deleteSucces: state.deleteArticleReducer.succes,
  showConfirm: state.deleteArticleReducer.showConfirm,
});

export default withRouter(connect(mapStateToProps, actions)(Article));
