import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, FormDiv, Input } from '../components/styles/FormStyle'

import { HiHome } from "react-icons/hi";
import { HeaderDiv } from '../components/styles/StartHeader';


export default function StartPage() {

    let navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const API_LOGIN = 'http://localhost:5050/auth/login/';


    function handleLogin(e) {
        e.preventDefault()
        const payload = { username, password }
        fetch(API_LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            // .then(data => console.log('login message', data))
            .then(data => {
                const token = data.token
                setError(data.message)
                localStorage.setItem('token', token)
                navigate('/dashboard')
            })



    }

/*     useEffect(() => {
        fetch('http://localhost:5050/auth/user', {
            headers:
                { 'x-access-token': localStorage.getItem('token') }
        })
            .then(res => res.json())
            // .then(data => console.log('get user', data))
            .then(data => 
                data.isLoggedIn ? navigate('/dashboard') : setError(data.message)
            )
    }, []) */

    /*  function getUser() {
         fetch('http://localhost:5050/auth/user', {
             headers:
                 { 'x-access-token': localStorage.getItem('token') }
         })
             .then(res => res.json())
             .then(data => console.log('get user', data))
             .then(data => data.isLoggedIn ? navigate('/dashboard') : console.log(data.message))
     } */

    return (
        <div>

            <HeaderDiv>
                <h1>Get sorted - Create your todos</h1>
            </HeaderDiv>


            <FormDiv>
                <h1 className="text-center mb-3">
                    <HiHome /> <br />  Sign in
                </h1>



                <Form onSubmit={event => handleLogin(event)}>
                    {error === '' ? '' : error}

                    <Input type="text" placeholder='username' onChange={e => setUsername(e.target.value)} />
                    <Input type="password" placeholder='password' onChange={e => setPassword(e.target.value)} />
                    <Input type="submit" value='Sign in' />
                    <Link to='/register'>Not a member? Click to sign up!</Link>
                </Form>
            </FormDiv>
        </div>

    )
}
