import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PostTodos(props) {
    const [todo, setTodo] = useState({
        user: '',
        title: '',
        text: '',
        attachments: [''],
        finished: false,
    })

    const [error, setError] = useState('')

    const navigate = useNavigate()
    const API_URL = 'http://localhost:5050/dashboard/'

    /*     function updateTodo(value) {
            return setTodo((prev) => {
                return { ...prev, ...value }
            })
        }
     */
    async function postTodo() {
        const newTodo = { ...todo }
        console.log('todo', todo)

        await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify(newTodo)
        })
            .then(res => res.json())
            .then(navigate('/dashboard'))
    }

    function clearInput() {
        return setTodo({
            user: '',
            title: '',
            text: '',
            attachments: [''],
            finished: false,
        })
    }

    function handleOnSubmit(e) {
        e.preventDefault()
        postTodo()
        clearInput()
        props.onClick()
    }

    return (
        <div>
            <h2>What do you need to do?</h2>
            <form encType='multipart/form-data' method='POST'>
                <div className="form-group">
                    <input name='title' type="text" class="form-control" placeholder="Todo Title" id="inputDefault" value={todo.title} onChange={(e) => setTodo({ title: e.target.value })} />
                </div>
                <br />
                <div className="input-group">
                    <textarea name='text' id='text' className="form-control" aria-label="With textarea" placeholder='Write your todo' value={todo.text} onChange={(e) => setTodo({ text: e.target.value })}></textarea>
                </div>
                <br />

                <div className="form-group">
                    <input name='attachments' className="form-control" type="file" id="formFile" value={todo.attachments} onChange={(e) => setTodo({ files: e.target.attachments[0] })} multiple />
                </div>

                <br />
                <div className='d-grid gap-2 col-6 mx-auto'><button className="btn btn-outline-primary" onClick={handleOnSubmit}>Add todo</button></div>
            </form>
        </div>
    )
}
