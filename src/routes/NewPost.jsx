import React, { useState } from 'react';
import './NewPost.css';
import { useNavigate } from 'react-router-dom';
import blogFetch from '../axios/config';

const NewPost = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const createPost = async (e) => {
    // Evita o recarregamento padrão do navegador
    e.preventDefault();

    // Cria o objeto post com todos os dados
    const post = {
      title,
      body,
      userId: 1,
    };

    try {
      // Faz a requisição POST com o objeto 'post' completo
      await blogFetch.post('/posts', post);

      // Navega para a página inicial após o sucesso
      navigate('/');
    } catch (error) {
      console.error('Error creating post:', error);
      // Você pode adicionar aqui uma lógica para exibir um erro ao usuário
    }
  };

  return (
    <div className="new-post">
      <h2>Insert new post:</h2>
      {/* Passa a função 'createPost' diretamente para o onSubmit */}
      <form onSubmit={createPost}>
        <div className="form-control">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Insert title"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className="form-control">
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            name="body"
            placeholder="Insert body"
            required
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
        </div>
        <button type="submit" className="btn">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default NewPost;