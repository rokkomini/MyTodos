import React from 'react'
import { BsFillXSquareFill } from "react-icons/bs";

export default function ListedTodos({ id, todo, date, onDelete, onToggle, status }) {

  return (


    <div>
      
      <ul className="list-group">
        <li key={id} className="list-group-item d-flex justify-content-between align-items-center">
          {todo}
          <div className='d-flex justify-content-between'>
            <div className='pe-5'><span className="badge bg-primary rounded-pill">{new Date(date).toJSON().substr(0, 16).replace('T', ' ')}</span></div>
            <div className='ps-4'><input className="form-check-input" type="checkbox" name='status' onChange={(e) => onToggle(id)} checked={status} /></div>
            <div className='ps-4'>
              <BsFillXSquareFill style={{ cursor: 'pointer' }}
                onClick={(e) => onDelete(id)} />
            </div>
          </div>
        </li>
      </ul>
     
    </div >
  )
}
