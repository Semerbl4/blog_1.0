import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';

import { Alert } from 'antd';

import * as actions from '../../redux/actions';

import 'antd/dist/antd.css';
import CreateArticleStyles from './CreateArticle.module.scss';

const CreateArticle = ({
  addTag,
  setTypedInTag,
  clearTypedInTag,
  deleteLastTag,
  postCreateArticle,
  typedInTag,
  tags,
  token,
  history,
  succes,
  unexpectedError,
  article,
  putUpdateArticle,
  clearCreateArticleReducer,
  match,
}) => {
  const { body, description, title, tagList } = article;
  
  const [ submitDisabled, setSubmitDisabled ] = useState(false)

  useEffect(() => {
    clearCreateArticleReducer();
    if (succes) {
      history.push('/');
    }
    if (Object.keys(article).length > 0) {
      addTag(tagList);
    }
  }, [token, history, succes, addTag, article, tagList, clearCreateArticleReducer]);

  const { register, handleSubmit } = useForm();

  const wideInputsStyles = cn(CreateArticleStyles.inputsCommon, CreateArticleStyles.inputsWide);
  const textAreaStyles = cn(
    CreateArticleStyles.inputsCommon,
    CreateArticleStyles.inputsWide,
    CreateArticleStyles.inputTextArea
  );
  const tagsInputStyles = cn(CreateArticleStyles.inputsCommon, CreateArticleStyles.inputTags);
  const deleteButtons = cn(CreateArticleStyles.tagButtonsCommon, CreateArticleStyles.deleteButton);
  const addTagButton = cn(CreateArticleStyles.tagButtonsCommon, CreateArticleStyles.addTagButton);

  const onSubmit = (data) => {
    setSubmitDisabled(true)
    if (Object.keys(article).length > 0) {
      putUpdateArticle(data.title, data.description, data.text, tags, match.params.slug, token);
    } else {
      postCreateArticle(data.title, data.description, data.text, tags, token);
    }
  };

  return (
    <div className={CreateArticleStyles.container}>
      {!!unexpectedError && (
        <Alert
          message={`Error ${unexpectedError}`}
          description="Server respond with an error"
          type="error"
          className={CreateArticleStyles.alert}
        />
      )}
      <h1 className={CreateArticleStyles.formTitle}>
        {Object.keys(article).length > 0 ? 'Edit' : 'Create new'} article
      </h1>
      <form className={CreateArticleStyles.form} onSubmit={handleSubmit(onSubmit)}>
        <label>
          <div className={CreateArticleStyles.inputTitle}>Title</div>
          <input
            type="text"
            className={wideInputsStyles}
            name="title"
            placeholder="Title"
            ref={register({ required: true })}
            defaultValue={title || ''}
          />
        </label>
        <label>
          <div className={CreateArticleStyles.inputTitle}>Short description</div>
          <input
            type="text"
            className={wideInputsStyles}
            name="description"
            placeholder="Description"
            ref={register({ required: true, maxLength: 239 })}
            defaultValue={description || ''}
          />
        </label>
        <label>
          <div className={CreateArticleStyles.inputTitle}>Text</div>
          <textarea
            type="text"
            className={textAreaStyles}
            name="text"
            placeholder="Text"
            ref={register({ required: true })}
            defaultValue={body || ''}
          />
        </label>
        <label className={CreateArticleStyles.inputTitle} htmlFor="tag">
          Tags
        </label>
        <div className={CreateArticleStyles.tagContainer}>
          <input
            type="text"
            className={tagsInputStyles}
            name="tag"
            placeholder="Tag"
            id="tag"
            ref={register()}
            onChange={(event) => setTypedInTag(event.target.value)}
            title="write a tag here"
            value={typedInTag}
          />
          <input
            type="button"
            className={deleteButtons}
            value="Delete"
            title="clear the field"
            onClick={clearTypedInTag}
          />
        </div>
        <div className={CreateArticleStyles.tagContainer}>
          <input
            type="text"
            className={tagsInputStyles}
            placeholder="Tags"
            value={tags}
            disabled
            title="list of tags for your article"
          />
          <input
            type="button"
            className={deleteButtons}
            value="Delete"
            title="delete last tag"
            onClick={deleteLastTag}
          />
          <input
            type="button"
            className={addTagButton}
            value="Add tag"
            onClick={() => addTag(typedInTag)}
            title="add writen tag"
          />
        </div>
        <input className={CreateArticleStyles.submit} type="submit" value="Send" disabled={submitDisabled}/>
      </form>
    </div>
  );
};

CreateArticle.defaultProps = {
  article: {},
  token: '',
};

CreateArticle.propTypes = {
  addTag: PropTypes.func.isRequired,
  setTypedInTag: PropTypes.func.isRequired,
  deleteLastTag: PropTypes.func.isRequired,
  clearTypedInTag: PropTypes.func.isRequired,
  postCreateArticle: PropTypes.func.isRequired,
  typedInTag: PropTypes.string.isRequired,
  token: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  tags: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  succes: PropTypes.bool.isRequired,
  unexpectedError: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  article: PropTypes.object,
  putUpdateArticle: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
  clearCreateArticleReducer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  typedInTag: state.createArticleReducer.typedInTag,
  tags: state.createArticleReducer.tags,
  succes: state.createArticleReducer.succes,
  unexpectedError: state.createArticleReducer.unexpectedError,
  token: state.logedUserReducer.user.token,
});

export default withRouter(connect(mapStateToProps, actions)(CreateArticle));
