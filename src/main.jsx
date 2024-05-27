import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './Layout.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import {Auth} from "./components/components.js"
import Home from './pages/Home.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Auth/>}/>
      <Route path='login' element={<Auth label='login'/>}/>
      <Route path='home' element={<Home/>}/>
    </Route>
  )
)

const elem = document.getElementById('root')
const root = ReactDOM.createRoot(elem)
root.render(
  <RouterProvider router={router} />
)