import { combineReducers } from 'redux';

import mainReducer from './mainReducer';
import errReducer from './errReducer';
import signUpReducer from './signUpReducer';
import signInReducer from './signInReducer';
import logedUserReducer from './logedUserReducer';
import editProfileReducer from './editProfileReducer';
import createArticleReducer from './createArticleReducer';
import openedArticleReducer from './openedArticleReducer';
import deleteArticleReducer from './deleteArticleReducer';

export default combineReducers({
  mainReducer,
  errReducer,
  signUpReducer,
  logedUserReducer,
  signInReducer,
  editProfileReducer,
  createArticleReducer,
  openedArticleReducer,
  deleteArticleReducer,
});
