import React from 'react'
import blogFetch from '../axios/config'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './NewPost.css'

const EditPost = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [title, setTitle] = useState()
    const [body, setBody] = useState()


    const getPost = async () => {
        try {
            const response = await blogFetch.get(`/posts/${id}`)
            const data = response.data

            setTitle(data.title)
            setBody(data.body)
        } catch (error) {
            console.error("Error fetching post:", error)
        }
    }

    const editPost = async (e) => {
        e.preventDefault();

        const post = {
            title,
            body,
            userId: 1, 
        };

        try {
            await blogFetch.put(`/posts/${id}`, post)
            navigate('/')
        } catch (error) {
            console.error("Error updating post:", error)
        }
    }

    useEffect(() => {
        getPost()
    }, [])
    
  return (
    <div className="new-post">
        <h2>Editing: {title}</h2>
        <form onSubmit={(e) => editPost()}>
            <div className="form-control">
                <label htmlFor="title">Title:</label>
                <input type="text" 
                id="title" 
                name="title" 
                placeholder='Insert title' 
                required 
                onChange={(e) => setTitle(e.target.value)} 
                value={title || ''}
                />
            </div>
            <div className="form-control">
                <label htmlFor="body">Body:</label>
                <textarea 
                id="body" 
                name="body" 
                placeholder='Insert body' 
                required
                onChange={(e) => setBody(e.target.value)}
                value={body || ''}
                ></textarea>
            </div>
            <button type="submit" className='btn' value="Edit Post">Edit Post</button>
        </form>
    </div>
  )
}

export default EditPost