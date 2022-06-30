import GetTodos from '../components/GetTodos'
import GetUser from '../components/GetUser'
import PostTodos from '../components/PostTodos'
import { useParams } from 'react-router-dom'
import { Footer } from '../components/styles/Footer'
import TodoHeader from '../components/TodoHeader'
import { useEffect, useState } from 'react'


export default function Dashboard() {

    const params = useParams()


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
