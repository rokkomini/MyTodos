import GetTodos from '../components/GetTodos'
import GetUser from '../components/GetUser'
import PostTodos from '../components/PostTodos'
import { useParams } from 'react-router-dom'
import { Footer } from '../components/styles/Footer'
import TodoHeader from '../components/TodoHeader'
import { useEffect, useState } from 'react'


export default function Dashboard() {
    const [todos, setTodos] = useState('')
    const params = useParams()

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        const API_URL = 'http://localhost:5050/dashboard/'
        fetch(API_URL, {
            method: 'GET',
            headers: { 'x-access-token': localStorage.getItem('token') },
        })
            .then(res => res.json())
            .then(data => {
                setTodos(data)
            })
    }

    return (
        <div>
            <GetUser />
            <br />
            <br />
            <div className='dashboardContainer'>

                <GetTodos id={params.id} />

            </div>
            <br />
            <br />
            <Footer />
        </div>
    )
}
