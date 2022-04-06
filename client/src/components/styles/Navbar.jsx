import React from 'react'

export default function navbar({ text }) {

    function handleLogout(){
        localStorage.removeItem('user')
    }
    return (

        
        <div>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <h1>{text}'s Todos</h1>
                    <form className="d-flex" onSubmit={handleLogout}>
                        <a href="/" className="btn btn-secondary my-2 my-sm-0">Logout</a>
                    </form>
                </div>
            </nav>

        </div>
    )
}
