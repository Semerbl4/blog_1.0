/* eslint-disable no-param-reassign */
const initialState = {
  errorGetArticlesForPage: false,
};

const errReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'ERROR_GET_ARTICLES_FOR_PAGE':
      state.errorGetArticlesForPage = true;
      return { ...state };

    default:
      return state;
  }
};

export default errReducer;
