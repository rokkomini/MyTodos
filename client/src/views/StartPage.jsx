import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, FormDiv, Input } from '../components/styles/FormStyle'

import { HiHome } from "react-icons/hi";
import { HeaderDiv } from '../components/styles/StartHeader';
//import { FaRedRiver } from 'react-icons/fa';
//import LoadingSpinner from '../components/LoadingSpinner';
import LoginForm from '../components/LoginForm';
import LoadingSpinner from '../components/LoadingSpinner';
import LoginHeader from '../components/styles/LoginHeader';


export default function StartPage() {

    let navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState('')
    //const [redirect, setRedirect] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const API_LOGIN = 'http://localhost:5050/auth/login/';


    function handleLogin(e) {
        e.preventDefault()
        setIsLoading(true)
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
                if (data.success === true || data.redirect === true) {
                    setTimeout(() => {
                        navigate('/dashboard')
                        setIsLoading(false)
                    }, 3000)

                } else {
                    setIsLoading(false)
                    setError(data.message)
                }
                localStorage.setItem('token', token)
            })
            .catch((error) => {
                setIsLoading(false)
                console.error('Error:', error);
            });
    }



    return (
        <div>

            <HeaderDiv>
                <h1>Get sorted - Create your todos</h1>
            </HeaderDiv>


            <FormDiv>


                {/* <LoginForm handleLogin={handleLogin} error={error} setUsername={setUsername} setPassword={setPassword} isLoading={isLoading}/> */}

                {isLoading ? <LoadingSpinner /> :
                    <div>
                        <LoginHeader header='Log in'/>
                        <Form onSubmit={event => handleLogin(event)}>
                            {error === '' ? '' : <span class="badge bg-warning">{error}</span>}
                            <br />
                            <Input type="text" placeholder='username' onChange={e => setUsername(e.target.value)} />
                            <Input type="password" placeholder='password' onChange={e => setPassword(e.target.value)} />
                            <Input type="submit" value='Sign in' disabled={isLoading} />
                            <Link to='/register' disabled={isLoading}>Not a member? Click to sign up!</Link>
                        </Form>
                    </div>
                }
            </FormDiv>
        </div>

    )
}
