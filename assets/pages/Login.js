import React, { useEffect, useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Navigate } from 'react-router-dom'

const Login = ({ apiUrl }) => {
  const [userEmail, setUserEmail] = useState('admin@admin.com')
  const [userPassword, setUserPassword] = useState('admin')
  const [jwt, setJwt] = useState(null)
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null)
  const [fetchError, setFetchError] = useState(null)

  const instance = axios.create({
    withCredentials: true,
    baseURL: apiUrl
  })

  useEffect(() => {
    setJwt(localStorage.getItem('token') || null)
  })

  const getJwt = async () => {
    const { data } = await instance.post(`${apiUrl}/api/login_check`, {
      'email': userEmail,
      'password': userPassword
    })
    localStorage.setItem('token', data.token)
    const user = jwt_decode(data.token)
    setUserRole(user.roles[0])
    localStorage.setItem('userRole', user.roles[0])
    setFetchError(null)
    console.clear()
    setJwt(data.token)
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

  return (
    <>
      {jwt && <Navigate to="/" />}

      <section>
        <h1>Connexion</h1>
      </section>
      <section>
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
    </>
  )
}

export default Login
