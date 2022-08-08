import React from 'react'
import { Loader } from './styles/Loader'
import LoginHeader from './styles/LoginHeader'

export default function LoadingSpinner({header}) {
  return (
    <div className='loader'>
      <LoginHeader header={header}/>
        <Loader></Loader>
    </div>
    
  )
}
