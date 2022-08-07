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

  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState([])

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
      .then(res => res.json())
      .then(data => {
        if (data.redirect === true) {
          alert('You have successfully registered an account')
          setSuccess(data.success)
        } else {
          setErrors(data.errors)
        }
      })
      .catch(error => {
        console.log('error', error);
      })
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
        {success ? <p>Registration successful</p> : 
        <Form onSubmit={handleRegister}>

          {errors.map(error => <span class="badge bg-warning">{error.msg} <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></span>
          )}

          <br />
          <Input type="text" placeholder='username' value={user.username} onChange={(e) => updateForm({ username: e.target.value })} />
          <Input type="password" placeholder='password' value={user.password} onChange={(e) => updateForm({ password: e.target.value })} />
          <Input type="submit" value='Create account' />
          <Link to='/'>Already a member? Click to sign in!</Link>
        </Form>
        }
      </FormDiv>
    </div>

  )
}
