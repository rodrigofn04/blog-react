import React from 'react'
import './Post.css'
import { useParams } from 'react-router-dom'
import blogFetch from '../axios/config'
import { useState, useEffect } from 'react'

const Post = () => {
    const [post, setPost] = useState({})
    const { id } = useParams()

    const getPost = async () => {
        try {
            const response = await blogFetch.get(`/posts/${id}`)
            const data = response.data
            setPost(data)
        } catch (error) {
            console.error("Error fetching post:", error)
        }
    }

    useEffect(() => {
        getPost()
    }, [])


  return (
    <div className='post-container'>
        {!post.title ? (
            <p>Carregando...</p>
        ) : (<div className="post">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
        </div>
        )}
    </div>
  )
}

export default Post