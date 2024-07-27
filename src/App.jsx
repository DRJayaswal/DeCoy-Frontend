import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home"
import Nav from './components/Nav'
import Foot from './components/Foot'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Nav/>
    <Home/>
    <Foot/>
    </>
  )
}

export default App
