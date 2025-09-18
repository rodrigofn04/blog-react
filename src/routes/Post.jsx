import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import blogFetch from '../axios/config';

import './Post.css';

const Post = () => {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  const getPost = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await blogFetch.get(`/posts/${id}`);
      const data = response.data;

      setPost(data);
    } catch (error) {
      console.error("Error fetching post:", error);
      setError("Erro ao carregar o post. Por favor, tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPost();
  }, [id]);

  if (loading) {
    return (
      <div className="post-container">
        <p>Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="post-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="post-container">
      <div className="post">
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </div>
    </div>
  );
};

export default Post;