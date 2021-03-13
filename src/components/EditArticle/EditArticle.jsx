import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Spin } from 'antd';

import * as actions from '../../redux/actions';

import CreateArticle from '../CreateArticle/CreateArticle';

const EditArticle = ({ article }) => {
  if (article) {
    return <CreateArticle article={article} />;
  }
  return <Spin />;
};

EditArticle.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  article: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  article: state.openedArticleReducer.article,
});

export default withRouter(connect(mapStateToProps, actions)(EditArticle));
