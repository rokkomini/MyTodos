import React from 'react'

export default function TodoHeader() {
    return (
        <div>
            <ul className="list-group">
                <li className="list-group-item list-group-item-action active d-flex justify-content-between align-items-center">
                    <h5>Your Todo</h5>
                    <div className='d-flex justify-content-between'>
                        <div className='pe-5'>Created</div>
                        <div className='ps-4'>Status</div>
                        <div className='ps-4'>
                            Delete
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}
