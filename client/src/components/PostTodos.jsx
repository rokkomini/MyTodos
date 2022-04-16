import React, { useEffect, useState } from 'react'

export default function PostTodos() {
    const [todo, setTodo] = useState({
        user: '',
        text: '',
        finished: false,
    })
    const API_URL = 'http://localhost:5050/dashboard/'

    function updateTodo(value) {
        return setTodo((prev) => {
            return { ...prev, ...value }
        })
    }

    async function postTodo() {
        const newTodo = { ...todo }
        console.log('postTodo', localStorage.getItem('token'))
        console.log('todo', todo)

        await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify(newTodo)
        })
            .catch(error => {
                window.alert(error);
                return;
            })
        console.log(todo)
    }

    return (
        <div>

            <h2>What do you need to do?</h2>
            <form >
                <div className="input-group">
                    <textarea name='text' id='text' className="form-control" aria-label="With textarea" placeholder='Write your todo' onChange={(e) => updateTodo({ text: e.target.value })}></textarea>
                    <button onClick={postTodo} className="btn btn-outline-primary">Add todo</button>
                </div>
            </form>

        </div>
    )
}
