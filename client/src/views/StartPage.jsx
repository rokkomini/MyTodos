import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, FormDiv, Input } from '../components/styles/FormStyle'

import { HiHome } from "react-icons/hi";
import { HeaderDiv } from '../components/styles/StartHeader';
import { FaRedRiver } from 'react-icons/fa';


export default function StartPage() {

    let navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState('')
    const [redirect, setRedirect] = useState(false)
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
            .then(data => {
                const token = data.token
                if (data.redirect === true) {
                    navigate('/dashboard')
                } else {
                    setError(data.message)
                }
                localStorage.setItem('token', token)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }



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
                    {error === '' ? '' : <span class="badge bg-warning">{error}</span>}
                    <br />
                    <Input type="text" placeholder='username' onChange={e => setUsername(e.target.value)} />
                    <Input type="password" placeholder='password' onChange={e => setPassword(e.target.value)} />
                    <Input type="submit" value='Sign in' />
                    <Link to='/register'>Not a member? Click to sign up!</Link>
                </Form>
            </FormDiv>
        </div>

    )
}
