import GetTodos from '../components/GetTodos'
import GetUser from '../components/GetUser'
import PostTodos from '../components/PostTodos'
import { useParams } from 'react-router-dom'
import { Footer } from '../components/styles/Footer'


export default function Dashboard() {
    const params = useParams()

    return (
        <div>
            <GetUser />
            <br />
            <br />
            <div className='dashboardContainer'>
                <PostTodos />
                <br />
                <div className='container'>
                    <GetTodos id={params.id} />
                </div>
            </div>
            <br />
            <br />
            <Footer />
        </div>
    )
}
