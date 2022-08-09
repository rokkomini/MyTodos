import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Input } from './styles/FormStyle'

export default function SubmitForm({onSubmit, error, value, setUsername, setPassword, isLoading, button, link, linkMsg}) {
    return (
        <div>
            <Form onSubmit={e => onSubmit(e)}>
                {/* {error === '' ? '' : <span class="badge bg-warning">{error}</span>}
                {errors.map(err => <span class="badge bg-warning">{err} </span> )}  */}
                {error}
                <br />
                <Input type="text" placeholder='username' value={value} onChange={e => setUsername(e.target.value)} />
                <Input type="password" placeholder='password' onChange={e => setPassword(e.target.value)} />
                <Input type="submit" value={button} disabled={isLoading} />
                <Link to={link} disabled={isLoading}>{linkMsg}</Link>
            </Form>
        </div>
    )
}
