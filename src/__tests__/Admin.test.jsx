import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Admin from '../routes/Admin';
import blogFetch from '../axios/config';

// Mocka o módulo da API
jest.mock('../axios/config');

// Dados de posts de exemplo para os testes
const mockPosts = [
  { id: 1, title: 'Título do Post 1' },
  { id: 2, title: 'Título do Post 2' },
];

describe('Admin Component', () => {
  beforeEach(() => {
    // Limpa todos os mocks antes de cada teste
    jest.clearAllMocks();
  });

  // Teste para verificar a renderização inicial
  test('deve renderizar a página de admin e o texto de "no posts available"', async () => {
    // Mocka a resposta da API para retornar um array vazio
    blogFetch.get.mockResolvedValue({ data: [] });

    render(
      <MemoryRouter>
        <Admin />
      </MemoryRouter>
    );

    // Espera que a chamada assíncrona da API seja resolvida
    await waitFor(() => {
      expect(blogFetch.get).toHaveBeenCalledWith('/posts');
    });

    // Verifica se os elementos corretos são exibidos
    expect(screen.getByText(/Admin Page/i)).toBeInTheDocument();
    expect(screen.getByText(/Manage your posts here/i)).toBeInTheDocument();
    expect(screen.getByText(/No posts available/i)).toBeInTheDocument();
  });

  // Teste para verificar se os posts são carregados corretamente
  test('deve renderizar a lista de posts após o carregamento', async () => {
    // Mocka a resposta da API para retornar os posts de exemplo
    blogFetch.get.mockResolvedValue({ data: mockPosts });

    render(
      <MemoryRouter>
        <Admin />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(blogFetch.get).toHaveBeenCalledWith('/posts');
    });

    // Verifica se os títulos dos posts são exibidos
    expect(screen.getByText('Título do Post 1')).toBeInTheDocument();
    expect(screen.getByText('Título do Post 2')).toBeInTheDocument();

    // Verifica se os botões "Edit" e "Delete" existem para cada post
    const editButtons = screen.getAllByText(/Edit/i);
    const deleteButtons = screen.getAllByText(/Delete/i);

    expect(editButtons).toHaveLength(mockPosts.length);
    expect(deleteButtons).toHaveLength(mockPosts.length);
  });

  // Teste para verificar a função de deleção
  test('deve deletar um post e atualizar a tela', async () => {
    // Mocka a requisição GET para retornar os posts iniciais
    blogFetch.get.mockResolvedValue({ data: mockPosts });

    // Mocka a requisição DELETE para simular a exclusão
    blogFetch.delete.mockResolvedValue({});

    render(
      <MemoryRouter>
        <Admin />
      </MemoryRouter>
    );

    // Espera o carregamento inicial dos posts
    await waitFor(() => {
      expect(screen.getByText('Título do Post 1')).toBeInTheDocument();
    });
    
    // Simula o clique no botão de "Delete" do primeiro post
    const deleteButton = screen.getAllByText(/Delete/i)[0];
    fireEvent.click(deleteButton);

    // Espera a chamada da API de deleção
    await waitFor(() => {
      expect(blogFetch.delete).toHaveBeenCalledWith('/posts/1');
    });

    // Espera que a tela seja atualizada e o post seja removido
    await waitFor(() => {
      expect(screen.queryByText('Título do Post 1')).not.toBeInTheDocument();
    });

    // Verifica se o outro post ainda está na tela
    expect(screen.getByText('Título do Post 2')).toBeInTheDocument();
  });
});