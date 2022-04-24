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
    const [todoTitle, setTodoTitle] = useState('')
    const [todoText, setTodoText] = useState('')
    const [todoAttachments, Attachments] = useState('')

    function updateForm(value) {
        return setTodo((prev) => {
          return { ...prev, ...value }
        })
      }

    const API_URL = 'http://localhost:5050/dashboard/'

    async function postTodo() {
        const newTodo = {...todo}
        console.log('todo', newTodo)

        await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify(newTodo)
        })
            .then(res => res.json)
            .then(data => console.log('consol posttodo', data))
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
            <form encType='multipart/form-data' method='post' onSubmit={handleOnSubmit}>
                <div className="input-group">
                    <input name='title' id='title' type="text" className="form-control" placeholder="Todo Title" value={todo.title} onChange={(e) => updateForm({ title: e.target.value })} />
                </div>
                <br />
                <div className="input-group">
                    <textarea name='text' id='text' className="form-control" aria-label="With textarea" placeholder='Write your todo' value={todo.text} onChange={(e) => updateForm({ text: e.target.value })}></textarea>
                </div>
                <br />

                <div className="input-group">
                    <input name='attachments' id='attachments' className="form-control" type="file" value={todo.attachments} onChange={(e) => updateForm({ files: e.target.attachments[0] })} multiple />
                </div>

                <br />
                <div className='d-grid gap-2 col-6 mx-auto'><input className="btn btn-outline-primary" type='submit' value={'Add todo'}/></div>
            </form>
        </div>
    )
}
