import React, { useEffect, useState } from 'react'

export default function PostTodos(props) {
    const [todo, setTodo] = useState('')
    const API_URL = 'http://localhost:5050/dashboard/'

    function postTodo() {
        console.log('postTodo', localStorage.getItem('token'))
        console.log('todo', todo)
        const payload = {todo}
        fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-access-token': localStorage.getItem('token') },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(data => props.onSuccess())
    }

    /*  useEffect(() => {
         fetch('http://localhost:5050/dashboard', {
             headers:
                 { 'x-access-token': localStorage.getItem('token') }
         })
             .then(res => res.json())
             .then(data => console.log(data))
             .then(data => data.isLoggedIn ? setTodo(data.todo) : null)
     }, [])
  */
    function clearInput() {
        setTodo('')
    }

    function submitTodo(e) {
        e.preventDefault()
        postTodo()
        clearInput()

    }

    return (
        <div>

            <label>Add a to do</label>
            <form onSubmit={event => submitTodo(event)}>
                <div className="input-group">
                    <textarea name='text' id='text' className="form-control" aria-label="With textarea" onChange={e => setTodo(e.target.value)}></textarea>
                    <button type="submit" className="btn btn-outline-primary">Add todo</button>
                </div>
            </form>

        </div>
    )
}
