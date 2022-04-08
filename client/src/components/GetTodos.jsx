import React, { useEffect, useState } from 'react'
import PostTodos from './PostTodos'
import ListedTodos from './styles/ListedTodos'

export default function GetTodos() {
    const [todos, setTodos] = useState('')

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
                console.log('data', data.result)
                return setTodos(data)
            })

    }

    return (
        <div>

            GetTodos
            <PostTodos onSuccess={fetchData} onClick={fetchData} />
            See my todos
            <div className='col'>
                <div className="row">
                    All todos
                    <ul className="list-group">
                        {todos && todos.map(item => {
                            return (
                                <>
                                    <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                                        {item.text}
                                        <div className='d-flex justify-content-between' >
                                            <span className="badge bg-primary rounded-pill">{item.postDate}</span>
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" ></input>
                                        </div>
                                    </li>

                                </>

                            )

                        })}
                    </ul>
                </div>
            </div>
        </div >
    )
}
