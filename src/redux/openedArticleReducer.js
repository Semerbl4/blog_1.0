const initialValue = {
  article: {},
  notFound: false,
  unexpectedError: 0,
};

const openedArticleReducer = (state = initialValue, action) => {
  let newState = { ...state };

  switch (action.type) {
    case 'SET_ARTICLE_UNEXPECTED_ERROR':
      newState.unexpectedError = action.payload;
      return newState;

    case 'SET_ARTICLE_NOT_FOUND':
      newState.notFound = true;
      return newState;

    case 'CLEAR_ARTICLE':
      newState = { ...initialValue };
      return newState;

    case 'SET_ARTICLE':
      newState.article = { ...action.payload };
      return newState;

    default:
      return state;
  }
};

export default openedArticleReducer;
