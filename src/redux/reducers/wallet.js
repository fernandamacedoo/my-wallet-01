import { RECEIVE_CURRENCIES,
  RECEIVE_EXCHANGE_RATES,
  UPDATE_TOTAL,
  DELETE_EXPENSE } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload.id),
    };
  case UPDATE_TOTAL:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case RECEIVE_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case RECEIVE_EXCHANGE_RATES:
    return {
      ...state,
      exchangeRates: action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
