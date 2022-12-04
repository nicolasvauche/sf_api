import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import Home from '../../pages/Home'
import Login from '../../pages/Login'

const apiUrl = 'http://localhost:6060'

const LayoutDefault = ({ page }) => {
  const [jwt, setJwt] = useState(localStorage.getItem('token') || null)
  const [users, setUsers] = useState([])
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null)
  const [fetchError, setFetchError] = useState(null)

  const instance = axios.create({
    withCredentials: true,
    baseURL: apiUrl
  })

  const getJwt = async role => {
    const { data } = await instance.post(`${apiUrl}/api/login_check`, {
      'email': role === 'admin' ? 'admin@admin.com' : 'nicolas@user.com',
      'password': role === 'admin' ? 'admin' : 'nicolas'
    })
    localStorage.setItem('token', data.token)
    const user = jwt_decode(data.token)
    setUserRole(user.roles[0])
    localStorage.setItem('userRole', user.roles[0])
    setUsers([])
    setFetchError(null)
    console.clear()
    setJwt(data.token)
  }

  const getUsers = async role => {
    try {
      const { data } = await instance.get(role === 'admin' ? `${apiUrl}/api/users` : `${apiUrl}/api/users/3`)
      setUsers(role === 'admin' ? data['hydra:member'] : [data])
      setFetchError(null)
      console.clear()
    } catch (err) {
      setFetchError(err.message)
    }
  }

  const logout = async () => {
    const { data } = await instance.get(`${apiUrl}/api/logout`)
    setJwt(null)
    setUsers([])
    setFetchError(null)
    setUserRole(null)
    localStorage.removeItem('userRole')
    localStorage.removeItem('token')
    console.clear()
  }

  return (
    <>
      <nav>
        <NavLink to="/">
          Accueil
        </NavLink>
        <NavLink to="/connexion">
          Connexion
        </NavLink>
      </nav>

      <main>
        <section>
          <div className="login">
            <button onClick={() => getJwt('admin')}>Get JWT (admin)</button>
            &nbsp;
            <button onClick={() => getJwt('user')}>Get JWT (nicolas)</button>
            {jwt && (
              <pre>
                <code>{jwt}</code>
              </pre>
            )}
          </div>
          {userRole && (
            <div className="users">
              {userRole === 'ROLE_ADMIN' ? (
                <button onClick={() => getUsers('admin')}>Get Users</button>
              ) : userRole === 'ROLE_USER' && (
                <button onClick={() => getUsers('user')}>Get User (nicolas)</button>
              )}
              <ul>
                {users.map((user, i) => (
                  <li key={user.id}>
                    {user.pseudo}&nbsp;
                    <small>({user.roles[0].toLowerCase()})</small>
                  </li>
                ))}
              </ul>
              {fetchError && (
                <p style={{ color: 'red' }}>{fetchError}</p>
              )}
            </div>
          )}
          {userRole ? (
            <div className="logout">
              <p>Connecté en tant que {userRole}</p>
              <button onClick={() => logout()}>
                Log Out
              </button>
            </div>
          ) : (
            <div className="logout">
              <p>Non connecté</p>
            </div>
          )}
        </section>

        <section>
          <div className="content">
            {page === 'home' && <Home />}
            {page === 'login' && <Login />}
          </div>
        </section>
      </main>
    </>
  )
}

export default LayoutDefault
