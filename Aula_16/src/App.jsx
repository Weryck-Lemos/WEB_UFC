import {BrowserRouter as Router ,Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import FavoritePage from './pages/FavoritePage'
import Header from "./components/Header"
import './App.css'
import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Header/>
      <nav style={{display:"flex", gap:"1rem", justifyContent:"center", margin:"1rem"}}>
        <Link to={"/"}>Inicio</Link>
        <Link to={"/favoritos"}>Favoritos</Link>
      </nav>

      <Routes>
        <Route path="/"element={<Home/>}/>
        <Route path="/favoritos"element={<FavoritePage/>}/>
    </Routes>
    </Router>
  )
}