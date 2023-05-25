import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const myEmail = 'fernanda@macedo.com';
const emailTestId = 'email-input';
const passwordTestId = 'password-input';

describe('Testa a página de Login', () => {
  beforeEach(() => {
    renderWithRouterAndRedux(<App />);
  });

  it('Verifica a existência dos campos do usuário e botão Entrar', () => {
    expect(screen.getByTestId(emailTestId)).toBeInTheDocument();
    expect(screen.getByTestId(passwordTestId)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
  });

  it('Verifica se o botão Entrar está desabilitado', () => {
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeDisabled();
  });

  it('Verifica se ao adicionar as informações válidas, o botão é habilitado', () => {
    userEvent.type(screen.getByTestId(emailTestId), myEmail);
    userEvent.type(screen.getByTestId(passwordTestId), 'fernanda123');
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeEnabled();
  });
});

describe('Testa a página da Carteira', () => {
  beforeEach(() => {
    renderWithRouterAndRedux(<App />);
    userEvent.type(screen.getByTestId(emailTestId), myEmail);
    userEvent.type(screen.getByTestId(passwordTestId), 'fernanda123');
    userEvent.click(screen.getByRole('button', { name: 'Entrar' }));
  });

  it('Verifica a existência dos campos do formulário e botão Adicionar despesa', () => {
    expect(screen.getByTestId('value-input')).toBeInTheDocument();
    expect(screen.getByTestId('description-input')).toBeInTheDocument();
    expect(screen.getByTestId('currency-input')).toBeInTheDocument();
    expect(screen.getByTestId('method-input')).toBeInTheDocument();
    expect(screen.getByTestId('tag-input')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Adicionar despesa' })).toBeInTheDocument();
  });

  it('Verifica as informações do Header', () => {
    expect(screen.getByText(myEmail)).toBeInTheDocument();
    expect(screen.getByTestId('total-field')).toBeInTheDocument();
    expect(screen.getByTestId('header-currency-field')).toBeInTheDocument();
  });

  it('Verifica se, ao clicado, o botão Adicionar Despesa exibe as informações na tela', () => {

  });

  it('Verifica se o Header tem seu valor atualizado a cada nova despesa', async () => {
    userEvent.type(screen.getByTestId('value-input'), '1');
    userEvent.click(screen.getByRole('button', { name: 'Adicionar despesa' }));

    await waitFor(() => expect(screen.getByRole('heading', { name: '5.28', level: 2 })).toBeInTheDocument());
  });
});

describe('Testa rotas e estados', () => {
  it('Verifica se, ao clicado, o botão Entrar salva as informações de login no estado global', () => {
    const { store } = renderWithRouterAndRedux(<App />);
    userEvent.type(screen.getByTestId(emailTestId), myEmail);
    userEvent.type(screen.getByTestId(passwordTestId), 'fernanda123');
    userEvent.click(screen.getByRole('button', { name: 'Entrar' }));

    expect(store.getState().user.email).toBe(myEmail);
  });

  it('Verifica se, ao clicado, o botão Adicionar Despesa salva as informações no estado global', () => {
  });

  it('Verifica se, ao clicado, o botão Entrar redireciona o usuário para a página da carteira', () => {
  });
});
