import React from 'react'

export default function navbar({ username }) {

    async function handleLogout() {
        localStorage.removeItem('token')
    }
    return (
        <div>
            <nav className="navbar navbar-dark bg-primary">
                <div className="container-fluid">
                    <h1 className="navbar-brand">Welcome {username}</h1>
                    <form className="d-flex" onSubmit={handleLogout}>
                        <ul className="navbar-nav me-auto">
                            <li >
                                <a className="nav-link" href="/">Logout
                                </a>
                            </li>
                        </ul>
                    </form>
                </div>
            </nav>
        </div>
    )
}

