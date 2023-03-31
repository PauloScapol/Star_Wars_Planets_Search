import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Testes de funcionalidade do componente Table', () => {
  test('Os títulos da tabela são renderizados', () => {
    render(<App />);
    const name = screen.getByText('Name');
    const rotationPeriod = screen.getByText('Rotation Period (Hours)');
    const orbitalPeriod = screen.getByText('Orbital Period (Days)');
    const diameter = screen.getByText('Diameter (Km)');
    const climate = screen.getByText('Climate');
    const gravity = screen.getByText('Gravity');
    const terrain = screen.getByText('Terrain');
    const surfaceWater = screen.getByText('Surface Water (%)');
    const population = screen.getByText('Population');
    const films = screen.getByText('Films');
    const created = screen.getByText('Created');
    const edited = screen.getByText('Edited');
    const url = screen.getByText('URL');


    expect(name).toBeVisible();
    expect(rotationPeriod).toBeVisible();
    expect(orbitalPeriod).toBeVisible();
    expect(diameter).toBeVisible();
    expect(climate).toBeVisible();
    expect(gravity).toBeVisible();
    expect(terrain).toBeVisible();
    expect(surfaceWater).toBeVisible();
    expect(population).toBeVisible();
    expect(films).toBeVisible();
    expect(created).toBeVisible();
    expect(edited).toBeVisible();
    expect(url).toBeVisible();
  });
});