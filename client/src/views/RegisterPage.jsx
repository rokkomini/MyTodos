import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, FormDiv, Input } from '../components/styles/FormStyle'
import { FaUserPlus } from "react-icons/fa";


export default function RegisterPage() {
  let navigate = useNavigate()

  const [user, setUser] = useState({
    username: '',
    password: ''
  })

  function updateForm(value) {
    return setUser((prev) => {
      return { ...prev, ...value }
    })
  }

  const API_REGISTER = 'http://localhost:5050/auth/register/';
  async function handleRegister(e) {
    e.preventDefault()

    const payload = { ...user }

    await fetch(API_REGISTER, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .catch(error => {
        window.alert(error);
        return;
      })
    setUser({ username: '', password: '' })
    navigate('/')
  }


  return (
    <div>
      <h1>Register page</h1>
      <h2>Welcome to register a new account!</h2>
      <div className="col-md-6 m-auto">
        <div className="card card-body">
          <h1 className="text-center mb-3">
            <FaUserPlus /> <br />  Register
          </h1>
          <Form onSubmit={handleRegister}>
            <Input type="text" placeholder='username' value={user.username} onChange={(e) => updateForm({ username: e.target.value })} />
            <Input type="password" placeholder='password' value={user.password} onChange={(e) => updateForm({ password: e.target.value })} />
            <Input type="submit" value='Register' />
            <Link to='/'>Already a member? Click to sign in!</Link>
          </Form>
        </div>
      </div>
    </div>
  )
}
