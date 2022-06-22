import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, FormDiv, Input } from '../components/styles/FormStyle'
import { FaUserPlus } from "react-icons/fa";
import { HeaderDiv } from '../components/styles/StartHeader';


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
      <HeaderDiv>
        <h1>Get sorted - Create your todos</h1>
      </HeaderDiv>

      <FormDiv >
        <h1 className="text-center mb-3">
          <FaUserPlus /> <br />  Create account
        </h1>
        <Form onSubmit={handleRegister}>
          <Input type="text" placeholder='username' value={user.username} onChange={(e) => updateForm({ username: e.target.value })} />
          <Input type="password" placeholder='password' value={user.password} onChange={(e) => updateForm({ password: e.target.value })} />
          <Input type="submit" value='Create account' />
          <Link to='/'>Already a member? Click to sign in!</Link>
        </Form>
      </FormDiv>
    </div>

  )
}
