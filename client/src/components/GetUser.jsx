import React, { useEffect, useState } from 'react'
import Navbar from '../components/styles/Navbar'
import axios from 'axios'

export default function GetUser() {
    const [user, setUser] = useState('')
    const API_URL = 'http://localhost:5050/auth/dashboard/'

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
    }, [])

    /*  function authHeader() {
         const user = JSON.parse(localStorage.getItem('user'));
         if (user && user.accessToken) {
           return { Authorization: 'Bearer ' + user.token };
         } else {
           return {};
         }
       }
      
     useEffect(() => {
        const token = localStorage.getItem('user')
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
        axios.get(API_URL, { headers: headers })
            .then((response) => {setUser(response.data)})
            .then(console.log(user))
    }, []) 

 /*    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("user"));
    }, []) */

    return (
        <div>
            Get User
            {user && (
                <Navbar text={user.username} />
            )}

        </div>
    )
}
