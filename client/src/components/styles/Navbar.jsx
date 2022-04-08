import React from 'react'

export default function navbar({ username }) {

    async function handleLogout(){
        localStorage.removeItem('token')
    }
    return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <h1>{username}'s Todos</h1>
                    <form className="d-flex" onSubmit={handleLogout}>
                        <a href="/" className="btn btn-secondary my-2 my-sm-0">Logout</a>
                    </form>
                </div>
            </nav>

        </div>
    )
}
