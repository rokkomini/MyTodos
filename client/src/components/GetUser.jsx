import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { config } from '../Constants'

export default function GetUser() {
    const [user, setUser] = useState('')
    const navigate = useNavigate()
    const API_URL = config.url

    useEffect(() => {
        fetch(`${API_URL}/auth/user`, {
            method: 'GET',
            headers:
                { 'x-access-token': localStorage.getItem('token') }
        })
            .then(res => res.json())
            .then(data => data.isLoggedIn ? setUser(data) : navigate('/'))
    }, [])

    function handleLogout() {
        localStorage.removeItem('token') 
    }    


    return (
        <div>
            {user && (
                <Navbar header={`Welcome to ${user.username}'s dashboard`} Onclick={handleLogout} link={'/'} linkName={'Log out'}/>
            )}
            {!user && (
                <Navbar username={'Unknown user'} />
            )}

        </div>
    )
}
