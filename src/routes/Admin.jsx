import React from 'react'
import './Admin.css'
import blogFetch from '../axios/config'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
    const [posts, setPosts] = useState([])
    const getPosts = async () => {
        try {
            const response = await blogFetch.get('/posts')

            const data = response.data
            setPosts(data)

        } catch (error) {
            console.error("Error fetching posts:", error)
        }
    }

    const deletePost = async (id) => {
        try {
            await blogFetch.delete(`/posts/${id}`)
            setPosts(posts.filter(post => post.id !== id))
        } catch (error) {
            console.error("Error deleting post:", error)
        }
    }

    useEffect(() => {
        getPosts() 
     }, [])


  return (
    <div className="admin">
        <h1>Admin Page</h1>
        <p>Manage your posts here.</p>
        {posts.length === 0 ? (
            <p>No posts available.</p>
        ) : (
            <div className="post-list">
                {posts.map((post) => (
                    <div className='post' key={post.id}>
                        <h2>{post.title}</h2>
                        <div className="actions">
                            <Link className='btn edit-btn' to={`/posts/edit/${post.id}`}>Edit</Link>
                            <button className='btn delete-btn' onClick={() => deletePost(post.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default Admin