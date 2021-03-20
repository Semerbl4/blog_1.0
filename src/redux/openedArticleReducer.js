/* eslint-disable no-param-reassign */
const initialState = {
  article: {},
  notFound: false,
  unexpectedError: 0,
};

const openedArticleReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'SET_ARTICLE_UNEXPECTED_ERROR':
      state.unexpectedError = action.payload;
      return { ...state };

    case 'SET_ARTICLE_NOT_FOUND':
      state.notFound = true;
      return { ...state };

    case 'CLEAR_ARTICLE':
      state = { ...initialState };
      return { ...state };

    case 'SET_ARTICLE':
      state.article = { ...action.payload };
      return { ...state };

    default:
      return state;
  }
};

export default openedArticleReducer;
