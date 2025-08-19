import React from 'react'
import blogFetch from '../axios/config'
import './NewPost.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NewPost = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const createPost = async (e) => { 
    e.preventDefault();

    const post = {
      title,
      body,
      userId: 1, 
  };

  await blogFetch.post('/posts', { 
    body: post.body, })

    navigate('/')
}

  return (
    <div className="new-post">
        <h2>Insert new post:</h2>
        <form onSubmit={(e) => createPost()}>
            <div className="form-control">
                <label htmlFor="title">Title:</label>
                <input type="text" 
                id="title" 
                name="title" 
                placeholder='Insert title' 
                required 
                onChange={(e) => setTitle(e.target.value)} value={title}
                />
            </div>
            <div className="form-control">
                <label htmlFor="body">Body:</label>
                <textarea 
                id="body" 
                name="body" 
                placeholder='Insert body' 
                required
                onChange={(e) => setBody(e.target.value)} value={body}></textarea>
            </div>
            <button type="submit" className='btn'>Create Post</button>
        </form>
    </div>
  )
}

export default NewPost