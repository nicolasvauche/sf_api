import React, { useEffect, useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Navigate } from 'react-router-dom'

const Login = ({ token, apiUrl }) => {
  const [userEmail, setUserEmail] = useState('admin@admin.com')
  const [userPassword, setUserPassword] = useState('admin')
  const [jwt, setJwt] = useState(null)
  const [fetchError, setFetchError] = useState(null)

  const instance = axios.create({
    withCredentials: true, baseURL: apiUrl
  })

  const getJwt = async () => {
    await instance.post(`${apiUrl}/api/login_check`, {
      'email': userEmail, 'password': userPassword
    }).then(response => {
      const user = jwt_decode(response.data.token)
      localStorage.setItem('userRole', user.roles[0])
      setFetchError(null)
      localStorage.setItem('token', response.data.token)
      setJwt(response.data.token)
      token = null
      console.clear()
    })
      .catch(error => {
        setFetchError(error.response.data)
      })
  }

  const handleEmail = e => {
    setUserEmail(e.target.value)
  }

  const handlePassword = e => {
    setUserPassword(e.target.value)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    await getJwt()
  }

  return (<>
    {(token || jwt) && <Navigate to="/" />}

    <section>
      <h1>Connexion</h1>
    </section>
    <section>
      {fetchError && (<p className="error">{fetchError.message}</p>)}

      <form className="app-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userEmail" className="required">Email</label>
          <input type="email" id="userEmail" className="form-control" required aria-required="true" value={userEmail} onChange={handleEmail} />
        </div>
        <div className="form-group">
          <label htmlFor="userPassword" className="required">Mot de passe</label>
          <input type="password" id="userPassword" className="form-control" required aria-required="true" value={userPassword} onChange={handlePassword} />
        </div>
        <div className="form-group">
          <button type="submit" className="app-btn">Connexion &raquo;</button>
        </div>
      </form>
    </section>
  </>)
}

export default Login
