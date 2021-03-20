/* eslint-disable no-param-reassign */
const initialState = {
  passOrEmailIncorrect: false,
  unexpectedError: 0,
};

const signInReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'SET_SIGN_IN_PASSWORD_OR_EMAIL_INCORRECT':
      state.passOrEmailIncorrect = true;
      return { ...state };

    case 'SET_SIGN_IN_UNEXPECTED_ERR':
      state.unexpectedError = action.payload;
      return { ...state };

    case 'CLEAN_SIGN_IN_REDUCER':
      return { ...initialState };

    default:
      return state;
  }
};

export default signInReducer;
