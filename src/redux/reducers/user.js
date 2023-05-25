import { SUBMIT_LOGIN_INFO } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUBMIT_LOGIN_INFO:
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
};

export default user;
