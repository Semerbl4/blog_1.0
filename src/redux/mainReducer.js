/* eslint-disable no-param-reassign */
const initialState = {
  currentPage: 1,
  articles: [],
  articlesLoading: false,
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'SET_ARTICLES_LOADING':
      state.articlesLoading = !state.articlesLoading;
      return { ...state };

    case 'SET_PAGE':
      state.currentPage = action.payload;
      return { ...state };

    case 'SET_ARTICLES_FOR_PAGE':
      state.articles = action.payload;
      return { ...state };

    default:
      return state;
  }
};

export default reducer;
