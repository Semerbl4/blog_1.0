import {
  DELETE_LOGED_USER_TYPE,
  SET_PAGE_TYPE,
  SET_ARTICLES_FOR_PAGE_TYPE,
  SET_ARTICLES_LOADING_TYPE,
  ERROR_GET_ARTICLES_FOR_PAGE_TYPE,
  SET_SIGN_UP_USERNAME_TYPE,
  SET_SIGN_UP_EMAIL_TYPE,
  SIGN_UP_PASSWORD_TYPE,
  SIGN_UP_REPEAT_PASSWORD_TYPE,
  TOOGLE_SIGN_UP_AGREEMENT_TYPE,
  CLEAR_SIGN_UP_REDUCER_TYPE,
  SET_SIGN_IN_PASSWORD_OR_EMAIL_INCORRECT_TYPE,
  CLEAN_SIGN_IN_REDUCER_TYPE,
  SET_EDIT_PROFILE_SUCCES_TYPE,
  SET_SIGN_IN_UNEXPECTED_ERROR_TYPE,
  SET_EDIT_PROFILE_UNEXPECTED_ERROR_TYPE,
  CLEAR_EDIT_PROFILE_REDUCER_TYPE,
  SET_SIGN_IN_EMAIL_TYPE,
  SET_SIGN_IN_PASSWORD_TYPE,
  SET_LOGED_USER_TYPE,
  SET_SIGN_UP_ERRORS_TYPE,
  SET_EDIT_PROFILE_ERRORS_TYPE,
  SET_UNEXPECTED_ERROR_TYPE,
  ADD_TAG_TYPE,
  SET_TYPED_IN_TAG_TYPE,
  CLEAR_TYPED_IN_TAG_TYPE,
  DELETE_LAST_TAG_TYPE,
  SET_CREATE_ARTICLE_SUCCES_TYPE,
  SET_CREATE_ARTICLE_UNEXPECTED_ERROR_TYPE,
  SET_ARTICLE_TYPE,
  CLEAR_ARTICLE_TYPE,
  SET_ARTICLE_NOT_FOUND_TYPE,
  SET_ARTICLE_UNEXPECTED_ERROR_TYPE,
  SET_DELETE_ARTICLE_ERR_TYPE,
  SET_DELETE_ARTICLE_SUCCES_TYPE,
  TOOGLE_SHOW_DELETE_CONFIRM_TYPE,
  CLEAR_DELETE_ARTICLE_REDUCER_TYPE,
  CLEAR_CREATE_ARTICLE_REDUCER_TYPE,
} from './actionsType';

export const deleteLoggedUser = () => ({ type: DELETE_LOGED_USER_TYPE });

export const setPage = (page) => ({ type: SET_PAGE_TYPE, payload: page });

export const setArticlesForPage = (articles) => ({ type: SET_ARTICLES_FOR_PAGE_TYPE, payload: articles });

export const setArticlesLoading = () => ({ type: SET_ARTICLES_LOADING_TYPE });

export const setErrGetArtForPage = () => ({ type: ERROR_GET_ARTICLES_FOR_PAGE_TYPE });

export const setSignUpUsername = (usn) => ({ type: SET_SIGN_UP_USERNAME_TYPE, payload: usn });

export const setSignUpEmail = (mail) => ({ type: SET_SIGN_UP_EMAIL_TYPE, payload: mail });

export const setSignUpPassword = (pas) => ({ type: SIGN_UP_PASSWORD_TYPE, payload: pas });

export const setSignUpRepeatPassword = (pas) => ({ type: SIGN_UP_REPEAT_PASSWORD_TYPE, payload: pas });

export const toogleAgreement = () => ({ type: TOOGLE_SIGN_UP_AGREEMENT_TYPE });

export const clearSignUpReducer = () => ({ type: CLEAR_SIGN_UP_REDUCER_TYPE });

export const setSignInPassOrEmailIncorrect = () => ({ type: SET_SIGN_IN_PASSWORD_OR_EMAIL_INCORRECT_TYPE });

export const cleanSignInReducer = () => ({ type: CLEAN_SIGN_IN_REDUCER_TYPE });

export const setEditProfileSucces = () => ({ type: SET_EDIT_PROFILE_SUCCES_TYPE });

export const setSignInUnexpectedErr = (err) => ({ type: SET_SIGN_IN_UNEXPECTED_ERROR_TYPE, payload: err });

export const setEditProfileUnexpectedError = (err) => ({ type: SET_EDIT_PROFILE_UNEXPECTED_ERROR_TYPE, payload: err });

export const clearEditProfileReducer = () => ({ type: CLEAR_EDIT_PROFILE_REDUCER_TYPE });

export const setSignInEmail = (mail) => ({ type: SET_SIGN_IN_EMAIL_TYPE, payload: mail });

export const setSignInPassword = (pas) => ({ type: SET_SIGN_IN_PASSWORD_TYPE, payload: pas });

export const setLogedUser = (user) => ({ type: SET_LOGED_USER_TYPE, payload: user });

export const setSignUpErrors = (err) => ({ type: SET_SIGN_UP_ERRORS_TYPE, payload: err });

export const setEditProfileErrors = (err) => ({ type: SET_EDIT_PROFILE_ERRORS_TYPE, payload: err });

export const setUnexpectedError = (unerr) => ({ type: SET_UNEXPECTED_ERROR_TYPE, payload: unerr });

export const addTag = (tag) => ({ type: ADD_TAG_TYPE, payload: tag });

export const setTypedInTag = (tag) => ({ type: SET_TYPED_IN_TAG_TYPE, payload: tag });

export const clearTypedInTag = () => ({ type: CLEAR_TYPED_IN_TAG_TYPE });

export const deleteLastTag = () => ({ type: DELETE_LAST_TAG_TYPE });

export const setCreateArticleSucces = () => ({ type: SET_CREATE_ARTICLE_SUCCES_TYPE });

export const setCreateArticleUnexpectedError = (err) => ({
  type: SET_CREATE_ARTICLE_UNEXPECTED_ERROR_TYPE,
  payload: err,
});

export const setArticle = (article) => ({ type: SET_ARTICLE_TYPE, payload: article });

export const clearArticle = () => ({ type: CLEAR_ARTICLE_TYPE });

export const setArticleNotFound = () => ({ type: SET_ARTICLE_NOT_FOUND_TYPE });

export const setArticleUnexpectedError = (err) => ({ type: SET_ARTICLE_UNEXPECTED_ERROR_TYPE, payload: err });

export const setDeleteArticleErr = (err) => ({ type: SET_DELETE_ARTICLE_ERR_TYPE, payload: err });

export const setDeleteArticleSucces = () => ({ type: SET_DELETE_ARTICLE_SUCCES_TYPE });

export const toogleShowDeleteConfirm = () => ({ type: TOOGLE_SHOW_DELETE_CONFIRM_TYPE });

export const clearDeleteArticleReducer = () => ({ type: CLEAR_DELETE_ARTICLE_REDUCER_TYPE });

export const clearCreateArticleReducer = () => ({ type: CLEAR_CREATE_ARTICLE_REDUCER_TYPE });

export const deleteArticle = (slug, token) => async (dispatch) => {
  let resp = await fetch(`https://conduit.productionready.io/api/articles/${slug}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
      Authorization: `Token ${token}`,
    },
  });

  // console.log(resp)

  if (resp.ok) {
    resp = await resp.json();
    dispatch(setDeleteArticleSucces());
  } else {
    dispatch(setDeleteArticleErr(resp.status));
  }
};

export const getArticle = (slug) => async (dispatch) => {
  let resp = await fetch(`https://conduit.productionready.io/api/articles/${slug}`);

  if (resp.ok) {
    resp = await resp.json();
    dispatch(setArticle(resp.article));
  }

  if (resp.status === 404) {
    dispatch(setArticleNotFound());
  } else if (resp.status) {
    dispatch(setArticleUnexpectedError(resp.status));
  }
};

export const getArticlesForPage = (page) => async (dispatch) => {
  dispatch(setArticlesLoading());
  let skippedArticles = 0;
  if (page > 1) {
    skippedArticles = 10 * (page - 1);
  }
  let resp = await fetch(`https://conduit.productionready.io/api/articles?limit=10&offset=${skippedArticles}`);
  if (resp.ok) {
    resp = await resp.json();
    dispatch(setArticlesLoading());
    dispatch(setArticlesForPage(resp.articles));
  } else {
    dispatch(setArticlesLoading());
    dispatch(setErrGetArtForPage());
  }
};

export const postSignUp = (usn, mail, pas) => async (dispatch) => {
  const signUpData = {
    user: {
      username: usn,
      email: mail,
      password: pas,
    },
  };

  let resp = await fetch('https://conduit.productionready.io/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(signUpData),
  });

  if (resp.ok) {
    resp = await resp.json();
    dispatch(setLogedUser(resp));
    dispatch(setEditProfileSucces());
  } else if (resp.status === 422) {
    resp = await resp.json();
    dispatch(setSignUpErrors(resp.errors));
  } else {
    dispatch(setUnexpectedError(resp.status));
  }
};

export const postSignIn = (mail, pas) => async (dispatch) => {
  const signInData = {
    user: {
      email: mail,
      password: pas,
    },
  };

  let resp = await fetch('https://conduit.productionready.io/api/users/login', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(signInData),
  });

  if (resp.ok) {
    resp = await resp.json();
    dispatch(setLogedUser(resp));
  } else if (resp.status === 422) {
    resp = await resp.json();
    dispatch(setSignInPassOrEmailIncorrect());
  } else {
    dispatch(setSignInUnexpectedErr(resp.status));
  }
};

export const putUpdateUser = (username, email, password, image, token) => async (dispatch) => {
  dispatch(clearEditProfileReducer());

  const updateUserData = {
    user: {
      username,
      email,
    },
  };

  if (password) {
    updateUserData.user.password = password;
  }
  if (image) {
    updateUserData.user.image = image;
  }

  let resp = await fetch('https://conduit.productionready.io/api/user', {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(updateUserData),
  });

  if (resp.ok) {
    resp = await resp.json();
    dispatch(setLogedUser(resp));
    dispatch(setEditProfileSucces());
  } else if (resp.status === 422) {
    resp = await resp.json();
    dispatch(setEditProfileErrors(resp.errors));
  } else {
    dispatch(setEditProfileUnexpectedError(resp.status));
  }
};

export const postCreateArticle = (title, description, body, tagList, token) => async (dispatch) => {
  const createArticleData = {
    article: {
      title,
      description,
      body,
    },
  };

  if (tagList) {
    createArticleData.article.tagList = tagList;
  }

  let resp = await fetch('https://conduit.productionready.io/api/articles', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(createArticleData),
  });

  if (resp.ok) {
    dispatch(setCreateArticleSucces());
    resp = await resp.json();
  } else {
    dispatch(setCreateArticleUnexpectedError(resp.status));
  }
};

export const putUpdateArticle = (title, description, body, tagList, slug, token) => async (dispatch) => {
  const UpdateArticleData = {
    article: {
      title,
      description,
      body,
      tagList,
    },
  };

  const resp = await fetch(`https://conduit.productionready.io/api/articles/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(UpdateArticleData),
  });

  if (resp.ok) {
    dispatch(setCreateArticleSucces());
  } else {
    dispatch(setCreateArticleUnexpectedError(resp.status));
  }
};

export const postFavoriteArticle = (slug, token, favorited) => async () => {
  let resp = await fetch(`https://conduit.productionready.io/api/articles/${slug}/favorite`, {
    method: favorited ? 'DELETE' : 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
      Authorization: `Token ${token}`,
    },
  });

  if (resp.ok) {
    resp = await resp.json();
  }
};
