export const SUBMIT_LOGIN_INFO = 'SUBMIT_LOGIN_INFO';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const RECEIVE_EXCHANGE_RATES = 'RECEIVE_EXCHANGE_RATES';
export const SUBMIT_WALLET_INFO = 'SUBMIT_WALLET_INFO';
export const UPDATE_TOTAL = 'UPDATE_TOTAL';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
const apiUrl = 'https://economia.awesomeapi.com.br/json/all';

export const submitLoginInfo = (loginInfo) => ({
  type: SUBMIT_LOGIN_INFO,
  payload: loginInfo,
});

const receiveCurrencies = (currencies) => ({
  type: RECEIVE_CURRENCIES,
  payload: currencies,
});

const receiveExchangeRates = (exchangeRates) => ({
  type: RECEIVE_EXCHANGE_RATES,
  payload: exchangeRates,
});

const updateTotal = (data) => ({
  type: UPDATE_TOTAL,
  payload: data,
});

export const fetchExchangeRates = () => async (dispatch) => {
  const response = await (await fetch(apiUrl)).json();
  delete response.USDT;
  const exchangeRates = [];
  for (let i = 0; i < Object.keys(response).length; i += 1) {
    const coinName = Object.keys(response)[i];
    const coinExchangeRate = Object.entries(response)[i][1].ask;
    exchangeRates.push({
      currency: coinName,
      ask: coinExchangeRate,
    });
  }
  dispatch(receiveExchangeRates(exchangeRates));
};

export const fetchCurrencies = () => async (dispatch) => {
  const response = await (await fetch(apiUrl)).json();
  delete response.USDT;
  const currencies = Object.keys(response);
  dispatch(receiveCurrencies(currencies));
};

export const submitWalletInfo = (state) => async (dispatch) => {
  const response = await (await fetch(apiUrl)).json();
  delete response.USDT;
  const data = {
    ...state,
    exchangeRates: response,
  };
  dispatch(updateTotal(data));
};

export const deleteExpense = (expenses) => ({
  type: DELETE_EXPENSE,
  payload: expenses,
});
