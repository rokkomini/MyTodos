import React, { useState } from 'react'

export default function PostTodos() {
    const [todo, setTodo] = useState({
        user: '',
        title: '',
        text: '',
        files: [],
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
                <div className="form-group">
                    <input name='title' type="text" class="form-control" placeholder="Todo Title" id="inputDefault" onChange={(e) => updateTodo({ title: e.target.value })} />
                </div>
                <br />
                <div className="input-group">
                    <textarea name='text' id='text' className="form-control" aria-label="With textarea" placeholder='Write your todo' onChange={(e) => updateTodo({ text: e.target.value })}></textarea>
                </div>
                <br />
                <form action="/dashboard" encType='multipart/form-data' method='POST'>
                    <div class="form-group">
                        <input name='multiple-files' className="form-control" type="file" multiple id="formFile" onChange={(e) => updateTodo({ files: e.target.files })} />
                    </div>
                </form>
                <br />
                <div className='d-grid gap-2 col-6 mx-auto'><button className="btn btn-outline-primary" onClick={postTodo}>Add todo</button></div>
            </form>
        </div>
    )
}
