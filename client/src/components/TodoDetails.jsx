import React, { useEffect, useState } from 'react'

export default function DetailPage({id}) {
    const [todoDetails, setTodoDetails] = useState('')

    useEffect(() => {
        fetchData()
    }, [id])

    async function fetchData() {
        const API_URL = `http://localhost:5050/dashboard/${id}`
        console.log('dashboard', localStorage.getItem('token'))
        fetch(API_URL, {
            method: 'GET',
            headers: { 'x-access-token': localStorage.getItem('token') },
        })
            .then(res => res.json())
            .then(data => {
                console.log('data', data)
                return setTodoDetails(data)
            })
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
        {todoDetails ? (
            <>
            <h2>{todoDetails.text}</h2>
            </>
        ) : (<p>Not found</p>)}
    </div>
  )
}