import React, { useEffect, useState } from 'react'
import ListedTodos from './ListedTodos';
import PostTodos from './PostTodos';
import TodoHeader from './TodoHeader';
import { config } from '../Constants';


export default function GetTodos({ id }) {
    const [todos, setTodos] = useState('')
    const API_URL = config.url

    useEffect(() => {
        fetchData()
    }, [id])

    async function fetchData() {
        fetch(`${API_URL}/dashboard`, {
            method: 'GET',
            headers: { 'x-access-token': localStorage.getItem('token') },
        })
            .then(res => res.json())
            .then(data => {
                setTodos(data)
            })
    }

    function handleOnDelete(id) {
        const url = `${API_URL}/dashboard/${id}`
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
        const url = `${API_URL}/dashboard/${id}`
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

    return (
        <div>
            <PostTodos onClick={fetchData} />
            <br />
            <div className="container">
                <TodoHeader />
                {display ? (
                    <div>
                        {todos.length > 0 ? (
                            todos && todos.filter(todo => todo.finished === false).map(activeTodo => (
                                <>
                                    <ListedTodos key={activeTodo._id} id={activeTodo._id} todo={activeTodo.title === undefined ? activeTodo.text : activeTodo.title} date={activeTodo.createdAt} onDelete={handleOnDelete} onToggle={toggleStatus} status={activeTodo.finished ? true : false} />
                                </>
                            ))
                        ) : (<p>No todos to show</p>)}
                    </div>
                ) : (
                    <div>
                        {todos.length > 0 ? (
                            todos && todos.filter(todo => todo.finished === true).map(activeTodo => (
                                <>
                                    <ListedTodos key={activeTodo._id} id={activeTodo._id} todo={activeTodo.title === undefined ? activeTodo.text : activeTodo.title} date={activeTodo.createdAt} onDelete={handleOnDelete} onToggle={toggleStatus} status={activeTodo.finished ? true : false} />
                                </>
                            ))
                        ) : (<p>No finished todos to show</p>)
                        }
                    </div>
                )}
                <br />
                <div className='d-grid gap-2 col-6 mx-auto'><button className="btn btn-outline-primary" onClick={() => setDisplay(!display)}>{display ? 'Show completed todos' : 'Show active todos'}</button></div>
            </div>
        </div >
    )
}
