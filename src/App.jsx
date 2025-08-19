import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
        <Navbar />
        <div className="container">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default App
