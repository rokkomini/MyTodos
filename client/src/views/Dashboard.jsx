import React, { useEffect, useState } from 'react'
import GetTodos from '../components/GetTodos'
import GetUser from '../components/GetUser'
import PostTodos from '../components/PostTodos'
import ListedTodos from '../components/ListedTodos'
import Navbar from '../components/styles/Navbar'
import { useParams } from 'react-router-dom'


export default function Dashboard() {
    const params = useParams()
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
            <PostTodos />
            
            <div className='col'>
                <div className="row">
                    <h5>All todos</h5>
                    
                    <div className="container">
                        <div className="container">
                            <GetTodos id={params.id}/>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
