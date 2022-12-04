import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LayoutDefault from './components/Layout/LayoutDefault'
import './Main.scss'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutDefault page="home" />,
  },
  {
    path: '/connexion',
    element: <LayoutDefault page="login" />
  },
])

if (document.getElementById('app')) {
  const rootElement = document.getElementById('app')
  const root = createRoot(rootElement)

  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  )
}
