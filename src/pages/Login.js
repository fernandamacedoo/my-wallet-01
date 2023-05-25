import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submitLoginInfo } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isEmailValid: false,
    isPasswordValid: false,
  };

  emailChange = ({ target }) => {
    const { email } = this.state;
    this.setState({ email: target.value });
    if (email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      this.setState({ isEmailValid: true });
    } else {
      this.setState({ isEmailValid: false });
    }
  };

  passwordChange = ({ target }) => {
    const minCaracteres = 6;
    this.setState({ password: target.value });
    if (target.value.length >= minCaracteres) {
      this.setState({ isPasswordValid: true });
    } else {
      this.setState({ isPasswordValid: false });
    }
  };

  render() {
    const { email, password, isEmailValid, isPasswordValid } = this.state;
    const { history, dispatch } = this.props;
    return (
      <div>
        <form
          onSubmit={ (e) => {
            e.preventDefault();
            dispatch(submitLoginInfo({ email }));
            history.push('/carteira');
          } }
        >
          <label htmlFor="email-input">
            E-mail:
            <input
              id="email-input"
              data-testid="email-input"
              value={ email }
              type="email"
              onChange={ this.emailChange }
            />
          </label>
          <label htmlFor="password-input">
            Senha:
            <input
              id="password-input"
              data-testid="password-input"
              value={ password }
              type="password"
              onChange={ this.passwordChange }
            />
          </label>
          <button
            type="submit"
            disabled={ !(isEmailValid && isPasswordValid) }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(null)(Login);
