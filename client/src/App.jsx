// import { useState } from 'react'
// import PostsList from "./features/posts/PostsList"
import { BrowserRouter as Router } from "react-router-dom"
import Navbar  from "./components/Navbar";
import './App.css'
import AppRoutes from "./components/AppRoutes";

function App() {
  

  return (
    <Router>
      <div>
        <h1>React on Rails Blog</h1>
        <Navbar/>
        <AppRoutes/>
      </div>
    </Router>
  )
}

export default App
