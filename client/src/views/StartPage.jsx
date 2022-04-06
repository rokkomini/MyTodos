import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, FormDiv, Input } from '../components/styles/FormStyle'
import { useHistory } from 'react-router-dom'


export default function StartPage() {
    let navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const API_LOGIN = 'http://localhost:5050/auth/login/';
    const payload = { username, password }

    function handleLogin(e) {
        e.preventDefault()

        fetch(API_LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(data => {
                const token = data.token
                localStorage.setItem('user', token)
                navigate('/dashboard')
            })
    }

    /* const History = useHistory()

    
    function handleLogin() {
        const payload = ({{ username, password }
    }
    axios.post(API_LOGIN, payload)
        .then(res => {
            alert(res.data.message)
            setLoginUser(res.data.user)
            History.push("/")
        })
}

const Login = ({ setLoginUser }) => {
    const history = useHistory()
    const [user, setUser] = useState({
        name: "",
        password: ""
    })
    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,//spread operator 
            [name]: value
        })
    }

    const login = () => {
        axios.post("http://localhost:6969/Login", user)
            .then(res => {
                alert(res.data.message)
                setLoginUser(res.data.user)
                history.push("/")
            })
    }
 */

    /* async function handleLogin(e) {
        e.preventDefault()
           const payload = {username, password}
          await fetch(API_LOGIN, {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(payload)
          }) 
        axios.post(API_LOGIN, { username, password })
            .then((response) => {
                if (response.data.token) {
                    console.log(response.data.token)
                    localStorage.setItem('user', JSON.stringify(response.data.token))
                    navigate('/dashboard')
                }
                return response.data
            })
    } */

    return (
        <div>
            <h1>Startpage</h1>
            <h2>Welcome to sign in</h2>
            <FormDiv>
                <Form onSubmit={handleLogin}>
                    <Input type="text" placeholder='username' onChange={e => setUsername(e.target.value)} />
                    <Input type="password" placeholder='password' onChange={e => setPassword(e.target.value)} />
                    <Input type="submit" value='Sign in' />
                    <Link to='/register'>Not a member? Click to sign up!</Link>
                </Form>
            </FormDiv>

        </div>
    )
}
