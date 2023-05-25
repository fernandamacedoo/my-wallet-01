import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  totalSum = () => {
    const { expenses } = this.props;
    if (expenses.length === 0) {
      return 0;
    }
    const sum = expenses.reduce((acc, expense) => (acc
      + (+expense.value * +expense.exchangeRates[expense.currency].ask)), 0);
    return sum;
  };

  render() {
    const { email } = this.props;
    return (
      <div>
        <h2 data-testid="email-field">{email}</h2>
        <h2 data-testid="total-field">
          { this.totalSum().toFixed(2) }
        </h2>
        <h2 data-testid="header-currency-field">BRL</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.user,
  ...state.wallet,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
