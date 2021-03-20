/* eslint-disable no-param-reassign */
const initialState = {
  username: '',
  email: '',
  password: '',
  repeatPassword: '',
  agreement: false,
  signUpSucces: false,
  errors: {},
  unexpectedError: 0,
};

const signUpReducer = (state = { ...initialState }, action) => {
  // const newState = { ...state };

  switch (action.type) {
    case 'SET_UNEXPECTED_ERROR':
      state.unexpectedError = action.payload;
      return { ...state };

    case 'SET_SIGN_UP_ERRORS':
      state.errors = { ...action.payload };
      return { ...state };

    case 'CLEAR_SIGN_UP_REDUCER':
      for (const key in state) {
        if (key === 'signUpSucces') {
          // eslint-disable-next-line no-continue
          continue;
        }
        state.key = initialState.key;
      }
      return { ...state };

    case 'TOOGLE_SIGN_UP_AGREEMENT':
      state.agreement = !state.agreement;
      return { ...state };

    case 'SET_SIGN_UP_EMAIL':
      state.email = action.payload;
      return { ...state };

    case 'SET_SIGN_UP_USERNAME':
      state.username = action.payload;
      return { ...state };

    case 'SIGN_UP_PASSWORD':
      state.password = action.payload;
      return { ...state };

    case 'SIGN_UP_REPEAT_PASSWORD':
      state.repeatPassword = action.payload;
      return { ...state };

    default:
      return state;
  }
};

export default signUpReducer;
