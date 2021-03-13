const initialState = {
  errorGetArticlesForPage: false,
};

const errReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case 'ERROR_GET_ARTICLES_FOR_PAGE':
      newState.errorGetArticlesForPage = true;
      return newState;

    default:
      return state;
  }
};

export default errReducer;
