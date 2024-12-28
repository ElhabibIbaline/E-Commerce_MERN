import { FC, PropsWithChildren, useState } from "react";

import { AuthContext } from './AuthContext'

const USERNAM_KEY = 'username'
const TOKEN_KEY = 'token'

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {

  const [username, setUsername] = useState<string | null>(localStorage.getItem(USERNAM_KEY))
  const [token, setToken] = useState<string | null>(localStorage.getItem(TOKEN_KEY))

  // useEffect(() => {
  //   const localUsername = localStorage.getItem('username')
  //   const localToken = localStorage.getItem('token')
  //   setUsername(localUsername)
  //   setToken(localToken)
  // }, [])


  const isAuthenticated = !!token

  const login = (username: string, token: string) => {
    setUsername(username)
    setToken(token)
    localStorage.setItem(USERNAM_KEY, username)
    localStorage.setItem(TOKEN_KEY, token)
  }

  const logout = () => {
    localStorage.removeItem(USERNAM_KEY)
    localStorage.removeItem(TOKEN_KEY)
    setUsername(null)
    setToken(null)
  }


  return (
    <AuthContext.Provider value={{ username, token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )

}

export default AuthProvider