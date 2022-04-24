import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from './styles/FormStyle'

export default function DetailPage({ id }) {
    const [todoDetails, setTodoDetails] = useState({
        title: '',
        text: '',
    })

    const [text, setText] = useState('')
    const [toggle, setToggle] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        fetchData()
            .then(data => data.isLoggedIn ? null : navigate('/'))
    }, [])

    async function fetchData() {
        const API_URL = `http://localhost:5050/dashboard/details/${id}`
        console.log('dashboard', localStorage.getItem('token'))
        fetch(API_URL, {
            method: 'GET',
            headers: { 'x-access-token': localStorage.getItem('token') },
        })
            .then(res => res.json())
            .then(data => {
                console.log('data', data)
                return setTodoDetails(data)
            })
    }
    /* 
        function deleteFiles(id) {
            const url = `http://localhost:5050/dashboard/details/${id}`
            const headers = {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token'),
            };
            fetch(url, {
                headers: headers,
                method: 'DELETE',
            })
                .then((res) => res.json())
                .then(data => fetchData())
        } */

    function updateTodo() {
        const payload = {...todoDetails}
        const url = `http://localhost:5050/dashboard/details/${id}`
        const headers = {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token'),
        };
        fetch(url, {
            headers: headers,
            method: 'PATCH',
            body: JSON.stringify(payload)
        })
            .then((res) => res.json())
            .then(data => {
                setTodoDetails(data) 
            })
            .then(data => fetchData(), navigate(`/dashboard/details/${id}`))
    }

    function updateTodoText() {
            setToggle(true)
            updateTodo()
       
    }

    return (
        <div>
            <nav className="navbar navbar-dark bg-primary">
                <div className="container-fluid">
                    <h1 className="navbar-brand">Update</h1>
                    <form className="d-flex">
                        <ul className="navbar-nav me-auto">
                            <li >
                                <a className="nav-link" href="/dashboard">Dashboard
                                </a>
                            </li>
                        </ul>
                    </form>
                </div>
            </nav>
            <h1>Detailpage</h1>
            {todoDetails ? (
                <div className="container p-4">
                    <div className="card bg-secondary mb-3">


                        <div className="card-header">{todoDetails.title}</div>

                        <div className="card-body">
                            {toggle ? (
                                <h4 className="card-title" onDoubleClick={() => { setToggle(false) }}>{todoDetails.text}</h4>
                            ) : (<input className="form-control" type='text' placeholder={todoDetails.text}  onChange={(e) => setTodoDetails( e.target.value )}
                                onKeyDown={(event => {
                                    if (event.key === 'Enter' || event.key === 'Escape') {
                                         updateTodoText()                          
                                    }
                                })} />)}
                        </div>
                    </div>
                </div>

            ) : (<p>Not found</p>)}
        </div>
    )
}