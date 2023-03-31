import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import mockData from './helpers/mockData';
import userEvent from '@testing-library/user-event';

describe('Testes da funcionalidade do componente Filter', () => {
  test('Os elementos necessários para a filtragem aparecem na tela', () => {
    render(<App />);

    const nameFilter = screen.getByTestId('name-filter');
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');
    const buttonRemoveFilters = screen.getByTestId('button-remove-filters');

    expect(nameFilter).toBeInTheDocument();
    expect(columnFilter).toBeInTheDocument();
    expect(comparisonFilter).toBeInTheDocument();
    expect(valueFilter).toBeInTheDocument();
    expect(buttonFilter).toBeInTheDocument();
    expect(buttonRemoveFilters).toBeInTheDocument();
  });

  test('Ao carregar a página, a tabela é renderizada sem filtros', async () => {
    jest.spyOn(global, 'fetch');

    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    render(<App />);

    const tatooine = await screen.findByText('Tatooine');
    const alderaan = await screen.findByText('Alderaan');
    const yavin4 = await screen.findByText('Yavin IV');
    const hoth = await screen.findByText('Hoth');
    const dagobah = await screen.findByText('Dagobah');
    const bespin = await screen.findByText('Bespin');
    const endor = await screen.findByText('Endor');
    const naboo = await screen.findByText('Naboo');
    const coruscant = await screen.findByText('Coruscant');
    const kamino = await screen.findByText('Kamino');

    expect(tatooine).toBeInTheDocument();
    expect(alderaan).toBeInTheDocument();
    expect(yavin4).toBeInTheDocument();
    expect(hoth).toBeInTheDocument();
    expect(dagobah).toBeInTheDocument();
    expect(bespin).toBeInTheDocument();
    expect(endor).toBeInTheDocument();
    expect(naboo).toBeInTheDocument();
    expect(coruscant).toBeInTheDocument();
    expect(kamino).toBeInTheDocument();
  });

  test('Ao pesquisar o nome de um planeta, a tabela renderiza corretamente', async () => {
    jest.spyOn(global, 'fetch');

    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    render(<App />);

    const inputName = screen.getByTestId('name-filter');
    expect(inputName).toBeInTheDocument();

    const tatooine = await screen.findByText('Tatooine');
    const alderaan = await screen.findByText('Alderaan');
    const hoth = await screen.findByText('Hoth');
    const coruscant = await screen.findByText('Coruscant');

    expect(tatooine).toBeInTheDocument();
    expect(alderaan).toBeInTheDocument();
    expect(hoth).toBeInTheDocument();
    expect(coruscant).toBeInTheDocument();

    userEvent.type(inputName, 't');

    expect(tatooine).toBeInTheDocument();
    expect(alderaan).not.toBeInTheDocument();
    expect(hoth).toBeInTheDocument();
    expect(coruscant).toBeInTheDocument();
  });

  test('Adiciona o filtro desejado ao clicar no botão Filtrar', async () => {
    jest.spyOn(global, 'fetch');

    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    render(<App />);

    const valueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');
    expect(valueFilter).toBeInTheDocument();
    expect(buttonFilter).toBeInTheDocument();

    const tatooine = await screen.findByText('Tatooine');
    const naboo = await screen.findByText('Naboo');
    const bespin = await screen.findByText('Bespin');

    expect(tatooine).toBeInTheDocument();
    expect(naboo).toBeInTheDocument();
    expect(bespin).toBeInTheDocument();

    userEvent.type(valueFilter, '6000000');
    userEvent.click(buttonFilter);

    expect(tatooine).not.toBeInTheDocument();
    expect(naboo).toBeInTheDocument();
    expect(bespin).not.toBeInTheDocument();
  });
})