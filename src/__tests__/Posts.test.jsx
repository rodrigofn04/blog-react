import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Post from '../routes/Post';
import blogFetch from '../axios/config';

jest.mock('../axios/config');

describe('Post component', () => {
  test('exibe título e corpo do post após o carregamento', async () => {
    const mockPostData = {
      title: 'Meu Post de Teste',
      body: 'Este é o conteúdo do post de teste.',
      userId: 1,
      id: 1,
    };
    blogFetch.get.mockResolvedValue({ data: mockPostData });

    render(
      <MemoryRouter initialEntries={['/posts/1']}>
        <Routes>
          <Route path="/posts/:id" element={<Post />} />
        </Routes>
      </MemoryRouter>
    );

    const titleElement = await screen.findByText(mockPostData.title);
    const bodyElement = await screen.findByText(mockPostData.body);

    expect(titleElement).toBeInTheDocument();
    expect(bodyElement).toBeInTheDocument();
  });

  test('exibe mensagem de erro se a API falhar', async () => {
    blogFetch.get.mockRejectedValue(new Error('Erro na API'));

    render(
      <MemoryRouter initialEntries={['/posts/1']}>
        <Routes>
          <Route path="/posts/:id" element={<Post />} />
        </Routes>
      </MemoryRouter>
    );
    const errorMessage = await screen.findByText(/Erro ao carregar o post/i);

    expect(errorMessage).toBeInTheDocument();
  });
});