import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { config } from '../Constants'

export default function DetailPage({ id }) {
    const [todoDetails, setTodoDetails] = useState({
        title: '',
        text: '',
    })

    const [text, setText] = useState('')
    const [title, setTitle] = useState('')
    const [attachments, setAttachments] = useState([])
    const [toggleOne, setToggleOne] = useState(true)
    const [toggleTwo, setToggleTwo] = useState(true)
    const navigate = useNavigate()
    const API_URL = config.url

    useEffect(() => {
        fetchData()
            .then(data => data.isLoggedIn ? null : navigate('/'))
    }, [])

    async function fetchData() {
        fetch(`${API_URL}/dashboard/details/${id}`, {
            method: 'GET',
            headers: { 'x-access-token': localStorage.getItem('token') },
        })
            .then(res => res.json())
            .then(data => {
                setTodoDetails(data)
            })
    }

    function updateTodo() {
        const payload = { ...todoDetails, text: text, title: title }
        const url = `${API_URL}/dashboard/details/${id}`
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
                setText(data.text)
                setTitle(data.title)
            })
            .then(data => fetchData(), navigate(`/dashboard/details/${id}`))
    }
    function keyDownFunctionTitle(event) {
        if (event.key === 'Enter' || event.key === 'Escape') {
            setToggleOne(true)
            event.preventDefault()
            updateTodo()
        }
    }

    function keyDownFunctionText(event) {
        if (event.key === 'Enter' || event.key === 'Escape') {
            setToggleTwo(true)
            event.preventDefault()
            updateTodo()
        }
    }
    function fileChangeHandler(value) {
        return setAttachments((prev) => {
            return { ...prev, ...value }
        })
    }


    function uploadFiles() {
        const data = new FormData()
        data.append('attachments', attachments)
        console.log('frontend uploadfiles', attachments)
        const url = `http://localhost:5050/upload`
        /*         const headers = {
                    'x-access-token': localStorage.getItem('token'),
                }; */
        fetch(url, {
            method: 'PATCH',
            body: data,
        })
            .then(res => console.log('Files sent'))
            .catch(err => console.log(err.message))
        /*             .then((res) => res.json())
                    .then(data => {
                        setTodoDetails(data)
                        setAttachments(data.attachments)
                    })
        
                    .then(data => fetchData(data), navigate(`/dashboard/details/${id}`)) */
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

            <div className="container p-4">
                {todoDetails ? (
                    <div className="card bg-secondary mb-3">

                        {toggleOne ? (
                            <div className="card-header"><h4 onDoubleClick={() => { setToggleOne(false) }}>{todoDetails.title}</h4></div>
                        ) : (<input className="form-control form-control-lg" name='title' type='text' value={title} placeholder={todoDetails.title === undefined ? 'No title added' : todoDetails.title} onChange={(e) => setTitle(e.target.value)}
                            onKeyDown={keyDownFunctionTitle} />)}
                        <div className="card-body">
                            {toggleTwo ? (
                                <p className="card-title" onDoubleClick={() => { setToggleTwo(false) }}>{todoDetails.text}</p>
                            ) : (<input className="form-control" name='text' type='text' value={text} placeholder={todoDetails.text} onChange={(e) => setText(e.target.value)}
                                onKeyDown={keyDownFunctionText} />)}
                        </div>
                    </div>
                ) : (<p>Not found</p>)}


                {/*    <h5>Add attachments</h5>
                <form onSubmit={uploadFiles}>
                    <div className="input-group">
                        <input name='attachments' id='attachments' className="form-control" type="file" multiple onChange={fileChangeHandler} />
                    </div>
                    <br />
                    <div className='d-grid gap-2 col-3 mx-auto'><input className="btn btn-outline-primary" type='submit' value={'Add attachments'} /></div>
                </form> */}
            </div>
        </div>
    )
}