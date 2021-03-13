import {
  deleteUserType,
  setPageType,
  setArticlesType,
  setArticlesLoadingType,
  setErrorGetArticlesType,
  setSignUpUsernameType,
  setSignUpEmailType,
  setSignUpPasswordType,
  setSignUpRepeatPasswordType,
  toogleSignUpAgreementType,
  clearSignUpReducerType,
  setSignInPassOrEmailIncorrectType,
  cleanSignInReducerType,
  setEditProfileSuccesType,
  setSignInUnexpectedErrType,
  setEditProfileUnexpectedErrorType,
  clearEditProfileReducerType,
  setSignInEmailType,
  setSignInPasswordType,
  setLogedUserType,
  setSignUpErrorsType,
  setEditProfileErrorsType,
  setUnexpectedErrorType,
  addTagType,
  setTypedInTagType,
  clearTypedInTagType,
  deleteLastTagType,
  setCreateArticleSuccesType,
  setCreateArticleUnexpectedErrorType,
  setArticleType,
  clearArticleType,
  setArticelNotFoundType,
  setArticleUnexpectedErrorType,
  setDeleteArticleErrType,
  setDeleteArticleSuccesType,
  toogleShowDeleteConfirmType,
  clearDeleteArticleReducerType,
  clearCreateArticleReducerType,
} from './actionsType';

export const deleteLoggedUser = () => ({ type: deleteUserType });

export const setPage = (page) => ({ type: setPageType, payload: page });

export const setArticlesForPage = (articles) => ({ type: setArticlesType, payload: articles });

export const setArticlesLoading = () => ({ type: setArticlesLoadingType });

export const setErrGetArtForPage = () => ({ type: setErrorGetArticlesType });

export const setSignUpUsername = (usn) => ({ type: setSignUpUsernameType, payload: usn });

export const setSignUpEmail = (mail) => ({ type: setSignUpEmailType, payload: mail });

export const setSignUpPassword = (pas) => ({ type: setSignUpPasswordType, payload: pas });

export const setSignUpRepeatPassword = (pas) => ({ type: setSignUpRepeatPasswordType, payload: pas });

export const toogleAgreement = () => ({ type: toogleSignUpAgreementType });

export const clearSignUpReducer = () => ({ type: clearSignUpReducerType });

export const setSignInPassOrEmailIncorrect = () => ({ type: setSignInPassOrEmailIncorrectType });

export const cleanSignInReducer = () => ({ type: cleanSignInReducerType });

export const setEditProfileSucces = () => ({ type: setEditProfileSuccesType });

export const setSignInUnexpectedErr = (err) => ({ type: setSignInUnexpectedErrType, payload: err });

export const setEditProfileUnexpectedError = (err) => ({ type: setEditProfileUnexpectedErrorType, payload: err });

export const clearEditProfileReducer = () => ({ type: clearEditProfileReducerType });

export const setSignInEmail = (mail) => ({ type: setSignInEmailType, payload: mail });

export const setSignInPassword = (pas) => ({ type: setSignInPasswordType, payload: pas });

export const setLogedUser = (user) => ({ type: setLogedUserType, payload: user });

export const setSignUpErrors = (err) => ({ type: setSignUpErrorsType, payload: err });

export const setEditProfileErrors = (err) => ({ type: setEditProfileErrorsType, payload: err });

export const setUnexpectedError = (unerr) => ({ type: setUnexpectedErrorType, payload: unerr });

export const addTag = (tag) => ({ type: addTagType, payload: tag });

export const setTypedInTag = (tag) => ({ type: setTypedInTagType, payload: tag });

export const clearTypedInTag = () => ({ type: clearTypedInTagType });

export const deleteLastTag = () => ({ type: deleteLastTagType });

export const setCreateArticleSucces = () => ({ type: setCreateArticleSuccesType });

export const setCreateArticleUnexpectedError = (err) => ({ type: setCreateArticleUnexpectedErrorType, payload: err });

export const setArticle = (article) => ({ type: setArticleType, payload: article });

export const clearArticle = () => ({ type: clearArticleType });

export const setArticleNotFound = () => ({ type: setArticelNotFoundType });

export const setArticleUnexpectedError = (err) => ({ type: setArticleUnexpectedErrorType, payload: err });

export const setDeleteArticleErr = (err) => ({ type: setDeleteArticleErrType, payload: err });

export const setDeleteArticleSucces = () => ({ type: setDeleteArticleSuccesType });

export const toogleShowDeleteConfirm = () => ({ type: toogleShowDeleteConfirmType });

export const clearDeleteArticleReducer = () => ({ type: clearDeleteArticleReducerType });

export const clearCreateArticleReducer = () => ({ type: clearCreateArticleReducerType });

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
    // console.log(resp)
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
    // console.log('не удалось получить артикль')
    // console.log(resp.status)
    dispatch(setArticleUnexpectedError(resp.status));
  }
};

export const getArticlesForPage = (page) => async (dispatch) => {
  dispatch(setArticlesLoading());
  let skippedArticles = 0;
  if (page > 1) {
    skippedArticles = 5 * (page - 1);
  }
  let resp = await fetch(`https://conduit.productionready.io/api/articles?limit=5&offset=${skippedArticles}`);
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
    // console.log(resp)
    dispatch(setLogedUser(resp));
    dispatch(setEditProfileSucces());
  } else if (resp.status === 422) {
    // console.log(resp)
    resp = await resp.json();
    dispatch(setSignUpErrors(resp.errors));
    // console.log(resp)
  } else {
    dispatch(setUnexpectedError(resp.status));
  }
};

export const postSignIn = (mail, pas) => async (dispatch) => {
  // console.log([mail, pas])
  const signInData = {
    user: {
      email: mail,
      password: pas,
    },
  };

  // console.log(JSON.stringify(signInData))

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
    // console.log('ok')
  } else if (resp.status === 422) {
    resp = await resp.json();
    // console.log(resp)
    // console.log([mail, pas])
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

  // console.log(resp)

  if (resp.ok) {
    resp = await resp.json();
    // console.log(resp)
    dispatch(setLogedUser(resp));
    dispatch(setEditProfileSucces());
  } else if (resp.status === 422) {
    resp = await resp.json();
    // console.log(resp)
    dispatch(setEditProfileErrors(resp.errors));
  } else {
    // console.log(resp.status);
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

  // console.log(createArticleData)

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
    // console.log(resp)
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
    // console.log(resp)
  }
};
