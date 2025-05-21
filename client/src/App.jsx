import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Welcome from './components/welcome'
import Navbar from './components/navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    
    <Welcome/>
    </>
     
    
  )
}

export default App
