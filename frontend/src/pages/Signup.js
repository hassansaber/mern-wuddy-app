import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'

const Signup = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup, error, isLoading } = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // sign user up
    await signup(email, password)

  }

  return (
    <form className='signup' onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <label>Email</label>
      <input
        type="email"
        onChange={e => setEmail(e.target.value)}
        value={email}
      />

      <label>password</label>
      <input
        type="password"
        onChange={e => setPassword(e.target.value)}
        value={password}
      />

      {
        // button will disable when isLoading is true
      }
      <button disabled={isLoading}>sign up</button>

      {
        // if we have error
      }
      {error && <div className="error" >{error}</div>}

    </form>
  )

}


export default Signup