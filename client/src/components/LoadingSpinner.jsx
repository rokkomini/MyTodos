import React from 'react'
import { Loader } from './styles/Loader'
import LoginHeader from './styles/LoginHeader'

export default function LoadingSpinner() {
  return (
    <div className='loader'>
      <LoginHeader header='Logging in'/>
        <Loader></Loader>
    </div>
    
  )
}
