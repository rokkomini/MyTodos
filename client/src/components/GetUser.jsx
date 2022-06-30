import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/styles/Navbar'


export default function GetUser() {
    const [user, setUser] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        fetch('http://localhost:5050/auth/user', {
            method: 'GET',
            headers:
                { 'x-access-token': localStorage.getItem('token')}
        })
            .then(res => res.json())
            .then(data => data.isLoggedIn ? setUser(data) : navigate('/'))
    }, [])


    return (
        <div>
            {user && (
                <Navbar username={user.username} />
            )}
            {!user && (
                <Navbar username={'Unknown user'}/>
            )}

        </div>
    )
}
