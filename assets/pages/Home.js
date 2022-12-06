import React from 'react'
import { Navigate } from 'react-router-dom'

const Home = ({ jwt }) => {
  return (
    <>
      {!jwt && <Navigate to="/connexion" />}

      <section>
        <h1>Accueil</h1>
      </section>
    </>
  )
}

export default Home
