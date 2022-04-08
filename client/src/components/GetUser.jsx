import React, { useEffect, useState } from 'react'
import Navbar from '../components/styles/Navbar'

export default function GetUser() {
    const [user, setUser] = useState('')
  /*   const API_URL = 'http://localhost:5050/auth/dashboard/me'

    useEffect(() => {
        const token = localStorage.getItem('user')
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        fetch(API_URL, {
            method: 'GET',
            headers: headers,
        })
            .then(res => res.json())
            .then(data => {
                setUser(data)
            })
    }, []) */

    useEffect(() => {
        fetch('http://localhost:5050/auth/user', {
            method: 'GET',
            headers:
                { 'x-access-token': localStorage.getItem('token')}
        })
            .then(res => res.json())
            .then(data => data.isLoggedIn ? setUser(data) : null)
    }, [])


    return (
        <div>
            Get User
            {`Console log user: ${console.log(user)}`}
            {user && (
                <Navbar username={user.username} />
            )}
            {!user && (
                <Navbar username={'Unknown user'}/>
            )}

        </div>
    )
}
