import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Admin from '../routes/Admin';
import blogFetch from '../axios/config';

jest.mock('../axios/config');

const mockPosts = [
  { id: 1, title: 'Título do Post 1' },
  { id: 2, title: 'Título do Post 2' },
];

describe('Admin Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deve renderizar a página de admin e o texto de "no posts available"', async () => {
    blogFetch.get.mockResolvedValue({ data: [] });

    render(
      <MemoryRouter>
        <Admin />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(blogFetch.get).toHaveBeenCalledWith('/posts');
    });

    expect(screen.getByText(/Admin Page/i)).toBeInTheDocument();
    expect(screen.getByText(/Manage your posts here/i)).toBeInTheDocument();
    expect(screen.getByText(/No posts available/i)).toBeInTheDocument();
  });

  test('deve renderizar a lista de posts após o carregamento', async () => {
    blogFetch.get.mockResolvedValue({ data: mockPosts });

    render(
      <MemoryRouter>
        <Admin />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(blogFetch.get).toHaveBeenCalledWith('/posts');
    });

    expect(screen.getByText('Título do Post 1')).toBeInTheDocument();
    expect(screen.getByText('Título do Post 2')).toBeInTheDocument();

    const editButtons = screen.getAllByText(/Edit/i);
    const deleteButtons = screen.getAllByText(/Delete/i);

    expect(editButtons).toHaveLength(mockPosts.length);
    expect(deleteButtons).toHaveLength(mockPosts.length);
  });

  test('deve deletar um post e atualizar a tela', async () => {
    blogFetch.get.mockResolvedValue({ data: mockPosts });

    blogFetch.delete.mockResolvedValue({});

    render(
      <MemoryRouter>
        <Admin />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Título do Post 1')).toBeInTheDocument();
    });
    
    const deleteButton = screen.getAllByText(/Delete/i)[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(blogFetch.delete).toHaveBeenCalledWith('/posts/1');
    });

    await waitFor(() => {
      expect(screen.queryByText('Título do Post 1')).not.toBeInTheDocument();
    });


    expect(screen.getByText('Título do Post 2')).toBeInTheDocument();
  });
});