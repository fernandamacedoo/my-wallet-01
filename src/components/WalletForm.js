import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchCurrencies,
  submitWalletInfo,
} from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: 0,
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, dispatch } = this.props;
    return (
      <div>
        <form
          onSubmit={ (e) => {
            e.preventDefault();
            dispatch(submitWalletInfo(this.state));
            this.setState((current) => ({
              id: current.id + 1,
              value: '',
              description: '',
              currency: 'USD',
              method: 'Dinheiro',
              tag: 'Alimentação',
            }));
          } }
        >

          <label htmlFor="value-input">
            <input
              name="value"
              value={ value }
              id="value-input"
              data-testid="value-input"
              placeholder="Valor da despesa"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="description-input">
            <input
              name="description"
              value={ description }
              id="description-input"
              data-testid="description-input"
              placeholder="Descrição da despesa"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="currency-input">
            <select
              name="currency"
              value={ currency }
              id="currency-input"
              data-testid="currency-input"
              onChange={ this.handleChange }
            >

              { currencies.map((coin, index) => (
                <option key={ index }>{coin}</option>
              ))}

            </select>
          </label>

          <label htmlFor="method-input">
            <select
              name="method"
              value={ method }
              id="method-input"
              data-testid="method-input"
              onChange={ this.handleChange }
            >

              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>

            </select>
          </label>

          <label htmlFor="tag-input">
            <select
              name="tag"
              value={ tag }
              id="tag-input"
              data-testid="tag-input"
              onChange={ this.handleChange }
            >

              <option value="Alimentacao">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saude">Saúde</option>

            </select>
          </label>
          <button
            type="submit"
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.user,
  ...state.wallet,
});

WalletForm.propTypes = {
  currencies: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
