import React from 'react'
import { BsFillXSquareFill } from "react-icons/bs";

export default function ListedTodos({ id, todo, date, onDelete, onToggle }) {
  return (
    <div>
      <ul className="list-group">
        <li key={id} className="list-group-item d-flex justify-content-between align-items-center">
          {todo}
          <div className='d-flex justify-content-between' >
            <span className="badge bg-primary rounded-pill">{date}</span>
            <input className="form-check-input" type="checkbox" value="" onClick={(e) => onToggle(id)}></input>

            <BsFillXSquareFill style={{ cursor: 'pointer' }}
              onClick={(e) => onDelete(id)} />

          </div>
        </li>
      </ul>
    </div >
  )
}
