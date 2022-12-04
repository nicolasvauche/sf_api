import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import Home from '../../pages/Home'
import Login from '../../pages/Login'

const apiUrl = 'http://localhost:6060'

const LayoutDefault = ({ page }) => {
  const [jwt, setJwt] = useState(null)
  const [users, setUsers] = useState([])
  const [userRole, setUserRole] = useState(null)
  const [fetchError, setFetchError] = useState(null)

  const instance = axios.create({
    withCredentials: true,
    baseURL: apiUrl
  })

  useEffect(() => {
    setJwt(localStorage.getItem('token') || null)
    setUserRole(localStorage.getItem('userRole') || null)
  })

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
    if (window.confirm('Déconnexion ?')) {
      const { data } = await instance.get(`${apiUrl}/api/logout`)
      setJwt(null)
      setUsers([])
      setFetchError(null)
      setUserRole(null)
      localStorage.removeItem('userRole')
      localStorage.removeItem('token')
      console.clear()
    }
  }

  return (
    <>
      <nav>
        <NavLink to="/">
          Accueil
        </NavLink>
        {userRole ? (
          <button className="no-btn" onClick={() => logout()}>Déconnexion</button>
        ) : (
          <NavLink to="/connexion">
            Connexion
          </NavLink>
        )}
      </nav>

      <main>
        <section>
          {userRole && (
            <div className="users">
              <p>
                <small>{userRole}</small>
              </p>

              {userRole === 'ROLE_ADMIN' ? (
                <button className="app-btn" onClick={() => getUsers('admin')}>Get Users</button>
              ) : userRole === 'ROLE_USER' && (
                <button className="app-btn" onClick={() => getUsers('user')}>Get User (nicolas)</button>
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
        </section>

        <section>
          <div className="content">
            {page === 'home' && <Home />}
            {page === 'login' && <Login apiUrl={apiUrl} />}
          </div>
        </section>
      </main>
    </>
  )
}

export default LayoutDefault
