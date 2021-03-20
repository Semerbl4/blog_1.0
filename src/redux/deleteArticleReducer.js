/* eslint-disable no-param-reassign */
const initialState = {
  unexpectedError: 0,
  succes: false,
  showConfirm: false,
};

const deleteArticleReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'CLEAR_DELETE_ARTICLE_REDUCER':
      return initialState;

    case 'TOOGLE_SHOW_DELETE_CONFIRM':
      state.showConfirm = !state.showConfirm;
      return { ...state };

    case 'SET_DELETE_ARTICLE_SUCCES':
      state.succes = true;
      return { ...state };

    case 'SET_DELETE_ARTICLE_ERR':
      state.unexpectedError = action.payload;
      return { ...state };

    default:
      return state;
  }
};

export default deleteArticleReducer;
