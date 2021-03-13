const initialState = {
  typedInTag: '',
  tags: [],
  succes: false,
  unexpectedError: 0,
};

const createArticleReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case 'CLEAR_CREATE_ARTICLE_REDUCER':
      return initialState;

    case 'SET_CREATE_ARTICLE_UNEXPECTED_ERROR':
      newState.unexpectedError = action.payload;
      return newState;

    case 'SET_CREATE_ARTICLE_SUCCES':
      newState.succes = true;
      return newState;

    case 'DELETE_LAST_TAG':
      newState.tags.pop();
      newState.tags = [...newState.tags];
      return newState;

    case 'CLEAR_TYPED_IN_TAG':
      newState.typedInTag = '';
      return newState;

    case 'SET_TYPED_IN_TAG':
      newState.typedInTag = action.payload;
      return newState;

    case 'ADD_TAG':
      if (Array.isArray(action.payload)) {
        newState.tags = [...action.payload];
      } else if (action.payload !== '') {
        newState.tags = [...newState.tags, action.payload];
      }

      return newState;

    default:
      return state;
  }
};

export default createArticleReducer;
