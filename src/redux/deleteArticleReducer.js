const initialState = {
  unexpectedError: 0,
  succes: false,
  showConfirm: false,
};

const deleteArticleReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case 'CLEAR_DELETE_ARTICLE_REDUCER':
      return initialState;

    case 'TOOGLE_SHOW_DELETE_CONFIRM':
      newState.showConfirm = !newState.showConfirm;
      return newState;

    case 'SET_DELETE_ARTICLE_SUCCES':
      newState.succes = true;
      return newState;

    case 'SET_DELETE_ARTICLE_ERR':
      newState.unexpectedError = action.payload;
      return newState;

    default:
      return state;
  }
};

export default deleteArticleReducer;
