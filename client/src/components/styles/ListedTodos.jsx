import React from 'react'

export default function ListedTodos({ text, postDate }) {
  return (
    <div>
      <div className='col' >Col2
        <div className="row">
          All todos
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              {text}
              <div className='d-flex justify-content-between' >
                <span className="badge bg-primary rounded-pill">{postDate}</span>
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" ></input>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
