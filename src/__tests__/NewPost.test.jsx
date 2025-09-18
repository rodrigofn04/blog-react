import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NewPost from '../routes/NewPost';
import blogFetch from '../axios/config';

jest.mock('../axios/config');
const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('NewPost formulario', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('o botão de submit está desabilitado se campos obrigatórios estiverem vazios', () => {
    render(
      <MemoryRouter>
        <NewPost />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /create post/i });

    expect(button).toBeInTheDocument();
  });

  test('preencher campos e submeter chama função apropriada', async () => {
    const mockPost = jest.spyOn(blogFetch, 'post').mockResolvedValue({});

    render(
      <MemoryRouter>
        <NewPost />
      </MemoryRouter>
    );

    const titleInput = screen.getByLabelText(/title/i);
    const bodyInput = screen.getByLabelText(/body/i);
    const button = screen.getByRole('button', { name: /create post/i });

    fireEvent.change(titleInput, { target: { value: 'Teste Título' } });
    fireEvent.change(bodyInput, { target: { value: 'Teste Conteúdo' } });

    expect(button).not.toBeDisabled();

    fireEvent.click(button);

    expect(mockPost).toHaveBeenCalledWith('/posts', {
      title: 'Teste Título',
      body: 'Teste Conteúdo',
      userId: 1,
    });

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('/');
    });
  });
});