import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Input } from './styles/FormStyle'

export default function LoginForm({handleLogin, error, setUsername, setPassword, isLoading}) {
    return (
        <div>
            <Form onSubmit={e => handleLogin(e)}>
                {error === '' ? '' : <span class="badge bg-warning">{error}</span>}
                <br />
                <Input type="text" placeholder='username' onChange={e => setUsername(e.target.value)} />
                <Input type="password" placeholder='password' onChange={e => setPassword(e.target.value)} />
                <Input type="submit" value='Sign in' disabled={isLoading} />
                <Link to='/register' disabled={isLoading}>Not a member? Click to sign up!</Link>
            </Form>
        </div>
    )
}
