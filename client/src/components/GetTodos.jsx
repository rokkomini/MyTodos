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
    /* 
        function checkboxStatus() {
            if (todos.finished === false) {
                return null
            } else {
                return checked
            }
        }  */

    return (
        <div>
            {todos.length > 0 ? (
                todos && todos.filter(todo => todo.finished === false).map(activeTodo => (
                    <>
                        <ListedTodos id={activeTodo._id} todo={activeTodo.text} date={activeTodo.createdAt} onDelete={handleOnDelete} onToggle={toggleStatus} status={activeTodo.finished ? true : false} />
                        {/*  <p>Todo status: {todo.finished ? 'Finished' : 'Not finished'}</p> */}
                    </>
                ))
            ) : (
                <p>No todos to show</p>
            )}
            <br />
            <div className='d-flex justify-content-center'><button className="btn btn-outline-primary">Show finished todos</button></div>
        </div >
    )
}
