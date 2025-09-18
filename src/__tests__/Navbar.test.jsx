import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';

describe('Navbar componente', () => {
  test('exibe links principais corretamente', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/New Post/i)).toBeInTheDocument();
    expect(screen.getByText(/Manage/i)).toBeInTheDocument();
    
    expect(screen.getByText(/Blog/i)).toBeInTheDocument();
  });
});