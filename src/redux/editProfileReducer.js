/* eslint-disable no-param-reassign */
const initialState = {
  errors: {},
  unexpectedError: 0,
  editProfileSucces: false,
};

const editProfileReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'SET_EDIT_PROFILE_ERRORS':
      state.errors = action.payload;
      return { ...state };

    case 'SET_EDIT_PROFILE_UNEXPECTED_ERROR':
      state.unexpectedError = action.payload;
      return { ...state };

    case 'SET_EDIT_PROFILE_SUCCES':
      state.editProfileSucces = true;
      return { ...state };

    case 'CLEAR_EDIT_PROFILE_REDUCER':
      return initialState;

    default:
      return state;
  }
};

export default editProfileReducer;
