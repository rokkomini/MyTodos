import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormDiv } from '../components/styles/FormStyle'
import { config } from '../Constants'

import { HeaderDiv } from '../components/styles/StartHeader';
//import { FaRedRiver } from 'react-icons/fa';
//import LoadingSpinner from '../components/LoadingSpinner';
import SubmitForm from '../components/SubmitForm';
import LoadingSpinner from '../components/LoadingSpinner';
import LoginHeader from '../components/styles/LoginHeader';


export default function StartPage() {

    let navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState('')
    //const [redirect, setRedirect] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    
    const API_URL = config.url

    function handleLogin(e) {
        e.preventDefault()
        setIsLoading(true)
        const payload = { username, password }
        fetch(`${API_URL}/auth/login`, {
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
                {console.log('Running in', process.env.NODE_ENV, 'URL:', API_URL)}
            </HeaderDiv>
            <FormDiv>
                {isLoading ? <LoadingSpinner header='Logging you in' /> :
                    <div>
                        <LoginHeader header='Log in' />
                        <SubmitForm
                            onSubmit={handleLogin}
                            error={error === '' ? '' : <span class="badge bg-warning">{error}</span>}
                            setUsername={setUsername}
                            setPassword={setPassword}
                            isLoading={isLoading}
                            button='Log in'
                            link='/register'
                            linkMsg='Not a member? Click to sign up!' />
                    </div>
                }
            </FormDiv>
        </div>

    )
}
