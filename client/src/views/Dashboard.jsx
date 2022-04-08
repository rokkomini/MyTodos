import React, { useEffect, useState } from 'react'
import GetTodos from '../components/GetTodos'
import GetUser from '../components/GetUser'
import PostTodos from '../components/PostTodos'
import ListedTodos from '../components/styles/ListedTodos'
import Navbar from '../components/styles/Navbar'

export default function Dashboard() {
    /* const [todos, setTodos] = useState(null)

    useEffect(() => {
        fetchData()
    }, [])

    function fetchData() {
        const API_URL = 'http://localhost:5050/dashboard/'
        const headers = {
            'x-access-token': localStorage.getItem('token')
        }
        fetch(API_URL, {
            method: 'GET',
            headers: headers,
        })
            .then(res => res.json())
            .then(data => setTodos(data.results))
    } */

    return (
        <div>
            <h1>Dashboard</h1>
            <GetUser />
            
            <h2>Here you should be able to post to do:s, view unfinished and finished + toggle if they are finished or not.</h2>
            <div className="container">
                <div className="container">
                    <GetTodos />
                
                </div>
            </div>
        </div>
    )
}
