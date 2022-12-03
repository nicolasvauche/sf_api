import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './Main.scss'

function Main () {
  return (
    <h1>Vinylothèque</h1>
  )
}

export default Main

if (document.getElementById('app')) {
  const rootElement = document.getElementById('app')
  const root = createRoot(rootElement)

  root.render(
    <StrictMode>
      <Main />
    </StrictMode>
  )
}
