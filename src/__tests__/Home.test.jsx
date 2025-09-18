// src/__tests__/Home.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../routes/Home';

jest.mock('../axios/config', () => ({
  get: jest.fn(() =>
    Promise.resolve({
      data: [
        { id: 1, title: 'Post A', body: 'Corpo do Post A' },
        { id: 2, title: 'Post B', body: 'Corpo do Post B' },
      ],
    })
  ),
}));

describe('Home route/page', () => {
  test('exibe lista de posts ou mensagem se não houver nenhum', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(await screen.findByText('Post A')).toBeInTheDocument();
    expect(await screen.findByText('Post B')).toBeInTheDocument();
  });
});