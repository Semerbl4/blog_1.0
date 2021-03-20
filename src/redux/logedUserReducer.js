/* eslint-disable no-param-reassign */
const initialState = {
  user: {},
};

const logedUserReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'DELETE_LOGED_USER':
      return initialState;

    case 'SET_LOGED_USER':
      state.user = { ...action.payload.user };
      return { ...state };

    default:
      return state;
  }
};

export default logedUserReducer;
