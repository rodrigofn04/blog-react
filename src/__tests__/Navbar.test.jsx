import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';

describe('Navbar componente', () => {
  test('exibe links principais corretamente', () => {
    // Renderiza o componente dentro de um MemoryRouter para simular o roteamento
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Verifica se os links existentes estão presentes no documento
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/New Post/i)).toBeInTheDocument();
    expect(screen.getByText(/Manage/i)).toBeInTheDocument();
    
    // O teste pode verificar se a logo 'Blog' também existe
    expect(screen.getByText(/Blog/i)).toBeInTheDocument();
  });
});