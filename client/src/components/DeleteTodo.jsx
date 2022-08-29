import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsFillXSquareFill } from "react-icons/bs"

export default function DeleteTodo(id) {
    const [todoList, setTodoList] = useState(null)
    let navigate = useNavigate()

    useEffect(() => {
        fetchData()
    }, [])

    function fetchData() {
        const API_URL = 'http://localhost:5050/dashboard/'
        console.log('dashboard', localStorage.getItem('token'))
        fetch(API_URL, {
            method: 'GET',
            headers: { 'x-access-token': localStorage.getItem('token') },
        })
            .then(res => res.json())
            .then(data => {
                console.log('data', data)
                return setTodoList(data)
            })
    }


    function handleOnDelete(res) {
        console.log('res', res)
        const id = res.id
        const url = `http://localhost:5050/dashboard/${id}`
        const headers = {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token'),
        };
        fetch(url, {
            headers: headers,
            method: 'DELETE'
        })
        .then((res) => fetchData())
        navigate('/dashboard')
    }

    return (
        <div>DeleteTodo
            <BsFillXSquareFill />
            <button onClick={(e) => handleOnDelete(id)}>Delete client</button>
        </div>
    )
}
