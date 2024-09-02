import React from 'react'
import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import Root from './routes/Root'
import Fridge from './routes/Fridge'
import Recipes from './routes/Recipes'
import Search from './routes/Search'
import Cart from './routes/Cart'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Root />} />
      <Route path='/fridge' element={<Fridge />} />
      <Route path='/recipes' element={<Recipes />} />
      <Route path='/search' element={<Search />} />
      <Route path='/cart' element={<Cart />} />
    </Routes>
  )
}

export default App
