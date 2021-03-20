/* eslint-disable no-param-reassign */
const initialState = {
  typedInTag: '',
  tags: [],
  succes: false,
  unexpectedError: 0,
};

const createArticleReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'CLEAR_CREATE_ARTICLE_REDUCER':
      return initialState;

    case 'SET_CREATE_ARTICLE_UNEXPECTED_ERROR':
      state.unexpectedError = action.payload;
      return { ...state };

    case 'SET_CREATE_ARTICLE_SUCCES':
      state.succes = true;
      return { ...state };

    case 'DELETE_LAST_TAG':
      state.tags.pop();
      return { ...state };

    case 'CLEAR_TYPED_IN_TAG':
      state.typedInTag = '';
      return { ...state };

    case 'SET_TYPED_IN_TAG':
      state.typedInTag = action.payload;
      return { ...state };

    case 'ADD_TAG':
      if (Array.isArray(action.payload)) {
        state.tags = [...action.payload];
      } else if (action.payload !== '') {
        state.tags = [...state.tags, action.payload];
      }
      return { ...state };

    default:
      return state;
  }
};

export default createArticleReducer;
