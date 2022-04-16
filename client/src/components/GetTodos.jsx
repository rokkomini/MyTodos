import React, { useEffect, useState } from 'react'
import PostTodos from './PostTodos'
import { AiOutlineDelete } from "react-icons/ai";
import { BsFillXSquareFill } from "react-icons/bs"
import { format } from 'date-fns'
import ListedTodos from './ListedTodos';
import { useNavigate, useParams } from 'react-router-dom';


export default function GetTodos({ id }) {
    const [todos, setTodos] = useState('')
    const [status, setStatus] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        fetchData()
    }, [id])

    async function fetchData() {
        const API_URL = 'http://localhost:5050/dashboard/'
        console.log('dashboard', localStorage.getItem('token'))
        fetch(API_URL, {
            method: 'GET',
            headers: { 'x-access-token': localStorage.getItem('token') },
        })
            .then(res => res.json())
            .then(data => {
                console.log('data', data)
                return setTodos(data)
            })
    }

    function handleOnDelete(id) {
        //e.preventDefault()
        console.log('testing delete', id)
        const url = `http://localhost:5050/dashboard/${id}`
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
    }

    function toggleStatus(id) {
        console.log('testing toggle', id)
        const url = `http://localhost:5050/dashboard/${id}`
        const headers = {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token'),
        };
        fetch(url, {
            headers: headers,
            method: 'PATCH',
        })
            .then((res) => res.json())
            .then(data => fetchData())
    }

    const [display, setDisplay] = useState(true)

    function toggleTodos() {
        setDisplay(!display)
    }



    return (
        <div>
            {display ? (
                <div>
                    <h3>Unfinished todos</h3>
                    {todos.length > 0 ? (
                        todos && todos.filter(todo => todo.finished === false).map(activeTodo => (
                            <>
                                <ListedTodos id={activeTodo._id} todo={activeTodo.text} date={activeTodo.createdAt} onDelete={handleOnDelete} onToggle={toggleStatus} status={activeTodo.finished ? true : false} />

                            </>
                        ))
                    ) : (
                        <p>No todos to show</p>
                    )}
                </div>) : (
                <div>
                    <h3>Finished Todos</h3>
                    {todos.length > 0 ? (
                        todos && todos.filter(todo => todo.finished === true).map(activeTodo => (
                            <>
                                <ListedTodos id={activeTodo._id} todo={activeTodo.text} date={activeTodo.createdAt} onDelete={handleOnDelete} onToggle={toggleStatus} status={activeTodo.finished ? true : false} />
                            </>
                        ))
                    ) : (
                        <p>No todos to show</p>
                    )}
                </div>
            )}
            <br />
            <div className='d-grid gap-2 col-6 mx-auto'><button className="btn btn-outline-primary" onClick={() => setDisplay(!display)}>{display ? 'Show completed todos' : 'Show active todos'}</button></div>
        </div >
    )
}
