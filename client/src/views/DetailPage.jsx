import React from 'react'
import TodoDetails from '../components/TodoDetails'
import { useParams } from 'react-router-dom'
import { Footer } from '../components/styles/Footer'

export default function DetailPage() {
    const params = useParams()
  return (
    <div>
        <TodoDetails id={params.id}/>
        <Footer />
        
    </div>
  )
}

