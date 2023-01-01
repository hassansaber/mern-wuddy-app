import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

export const useSignup = () => {

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (email, password) => {

    setIsLoading(true)
    setError(null)


    //  request
    const response = await fetch('api/user/signup', {
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
  return { signup, isLoading, error }
} 