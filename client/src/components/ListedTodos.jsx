import React from 'react'
import { BsFillXSquareFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

export default function ListedTodos({ id, todo, date, onDelete, onToggle, status }) {

  return (
    <div>
      
      <ul className="list-group">
        <li key={id} className="list-group-item d-flex justify-content-between align-items-center">
          <Link key={id} to={`/dashboard/details/${id}`}>{todo}</Link>
          <div className='d-flex justify-content-between'>
            <div className='ps-3 pe-4'><span className="badge bg-primary rounded-pill"> {new Date(date).toLocaleString('sv-SE', { timeZone: 'Europe/Berlin' })}</span></div>
            <div className='ps-3 pe-5'><input className="form-check-input" type="checkbox" name='status' onChange={(e) => onToggle(id)} checked={status} /></div>
            <div className='ps-3 pe-3'>
              <BsFillXSquareFill style={{ cursor: 'pointer' }}
                onClick={(e) => onDelete(id)} />
            </div>
          </div>
        </li>
      </ul>
     
    </div >
  )
}
