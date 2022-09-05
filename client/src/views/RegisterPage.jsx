import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, FormDiv, Input } from '../components/styles/FormStyle'
import { FaUserPlus } from "react-icons/fa";
import { HeaderDiv } from '../components/styles/StartHeader';
import LoadingSpinner from '../components/LoadingSpinner';
import { config } from '../Constants';

export default function RegisterPage() {
  let navigate = useNavigate()

  const [user, setUser] = useState({
    username: '',
    password: ''
  })

  const API_URL = config.url

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState([])

  function updateForm(value) {
    return setUser((prev) => {
      return { ...prev, ...value }
    })
  }

  const API_REGISTER = `${API_URL}/auth/register`;
  function handleRegister(e) {
    e.preventDefault()

    const payload = { ...user }
    fetch(API_REGISTER, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success === true || data.redirect === true) {
          setIsLoading(true)
          setTimeout(() => {
            navigate('/')
            setIsLoading(false)
          }, 3000)
        } else {
          setErrors(data.errors)
          console.log('errors', data.errors)
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
        {isLoading ? <LoadingSpinner header='Creating your account' /> :
          /*    <SubmitForm
               onSubmit={handleRegister}
               errors={errors === [] ? '' : errors.map(error => <span class="badge bg-warning">{error.msg} </span>)}
               setUsername={setUsername}
               setPassword={setPassword}
               isLoading={isLoading}
               button='Sign up'
               link='/'
               linkMsg='Already a member? Click to log in!' 
               
         
               /> */
          <Form onSubmit={handleRegister}>

            {errors.map(error => <span class="badge bg-warning">{error.msg} </span>
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
