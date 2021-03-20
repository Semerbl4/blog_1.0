export const deleteArticle = async (slug, token) => {
  const resp = await fetch(`https://conduit.productionready.io/api/articles/${slug}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
      Authorization: `Token ${token}`,
    },
  });

  if (resp.ok) {
    return resp;
  }
  throw new Error(resp.status);
};

export const getArticle = async (slug) => {
  let resp = await fetch(`https://conduit.productionready.io/api/articles/${slug}`);

  if (resp.ok) {
    resp = await resp.json();
    return resp;
  }

  throw new Error(resp.status);
};

export const getArticlesForPage = async (page) => {
  // dispatch(setArticlesLoading());
  let skippedArticles = 0;
  if (page > 1) {
    skippedArticles = 10 * (page - 1);
  }
  let resp = await fetch(`https://conduit.productionready.io/api/articles?limit=10&offset=${skippedArticles}`);
  if (resp.ok) {
    resp = await resp.json();
    return resp.articles;
  }
  throw new Error();
};

export const postSignUp = async (usn, mail, pas) => {
  const signUpData = {
    user: {
      username: usn,
      email: mail,
      password: pas,
    },
  };

  let resp = await fetch('https://conduit.productionready.io/ap/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(signUpData),
  });

  if (resp.ok) {
    resp = await resp.json();
    return resp;
  }
  if (resp.status === 422) {
    resp = await resp.json();
    throw new Error(JSON.stringify(resp.errors));
  }
  throw new Error(resp.status);
};

export const postSignIn = async (mail, pas) => {
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
    // dispatch(setLogedUser(resp));
  } else if (resp.status === 422) {
    resp = await resp.json();
    // dispatch(setSignInPassOrEmailIncorrect());
  } else {
    // dispatch(setSignInUnexpectedErr(resp.status));
  }
};

export const putUpdateUser = async (username, email, password, image, token) => {
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
    return resp;
    // dispatch(setLogedUser(resp));
    // dispatch(setEditProfileSucces());
  }
  if (resp.status === 422) {
    resp = await resp.json();
    throw new Error(JSON.stringify(resp.errors));
    // dispatch(setEditProfileErrors(resp.errors));
  } else {
    throw new Error(resp.status);
    // dispatch(setEditProfileUnexpectedError(resp.status));
  }
};

export const postCreateArticle = async (title, description, body, tagList, token) => {
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

  const resp = await fetch('https://conduit.productionready.io/api/articles', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(createArticleData),
  });

  if (resp.ok) {
    return resp;
    // dispatch(setCreateArticleSucces());
    // resp = await resp.json();
  }
  throw new Error(resp.status);
  // dispatch(setCreateArticleUnexpectedError(resp.status));
};

export const putUpdateArticle = async (title, description, body, tagList, slug, token) => {
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
    return resp;
    // dispatch(setCreateArticleSucces());
  }
  throw new Error(resp.status);
  // dispatch(setCreateArticleUnexpectedError(resp.status));
};

export const postFavoriteArticle = async (slug, token, favorited) => {
  const resp = await fetch(`https://conduit.productionready.io/api/articles/${slug}/favorite`, {
    method: favorited ? 'DELETE' : 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
      Authorization: `Token ${token}`,
    },
  });

  return resp;
};
