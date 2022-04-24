import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input } from '../components/styles/FormStyle'

import { HiHome } from "react-icons/hi";

export default function StartPage() {

    let navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
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
                localStorage.setItem('token', token)
                navigate('/dashboard')
            })
    }

    useEffect(() => {
        fetch('http://localhost:5050/auth/user', {
            headers:
                { 'x-access-token': localStorage.getItem('token') }
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .then(data => data.isLoggedIn ? navigate('/dashboard') : null)
    }, [])

    return (
        <div>

            <h1>Startpage</h1>
            <h2>Welcome to sign in</h2>
            <div className="col-md-6 m-auto">
                <div className="card card-body">
                    <h1 className="text-center mb-3">
                        <HiHome /> <br />  Sign in
                    </h1>
                    <Form onSubmit={event => handleLogin(event)}>
                        <Input type="text" placeholder='username' onChange={e => setUsername(e.target.value)} />
                        <Input type="password" placeholder='password' onChange={e => setPassword(e.target.value)} />
                        <Input type="submit" value='Sign in' />
                        <Link to='/register'>Not a member? Click to sign up!</Link>
                    </Form>
                </div>
            </div>

        </div>
    )
}
