import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

export const useLogin = () => {

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {

    setIsLoading(true)
    setError(null)


    //  request
    const response = await fetch('api/user/login', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    // response
    const json = await response.json()

    // error handling
    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }

    // if everything ok
    if (response.ok) {
      // save the user to local storage as JWT
      // real LOG IN
      localStorage.setItem('user', JSON.stringify(json))

      // update auth context ==> {user,token}
      dispatch({
        type: 'LOGIN',
        payload: json
      })

      // finish loading
      setIsLoading(false)
    }
  }

  // we can grab these with our hook:
  return { login, isLoading, error }
} 