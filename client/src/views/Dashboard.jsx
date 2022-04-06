import React, { useEffect, useState } from 'react'
import GetUser from '../components/GetUser'


export default function Dashboard() {
    

    return (
        <div>
            <GetUser/>
            <h1>Dashboard</h1>
            <h2>Here you should be able to post to do:s, view unfinished and finished + toggle if they are finished or not.</h2>

            <div className='row'>
                <div className='col'>
                    <label htmlFor="">Add a to do</label>
                    <textarea
                        className="form-control"
                        id="exampleTextarea"
                        rows="3"
                        name="content"
                    ></textarea>
                    <button>Add to do</button>
                </div>
                <div className='col' >Col2
                    <div className="row">
                        Show unfinished to dos
                        <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Cras justo odio
                                <div className='d-flex justify-content-between' >
                                    <span className="badge bg-primary rounded-pill">datum</span>
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" ></input>
                                </div>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Dapibus ac facilisis in
                                <div className='d-flex justify-content-between' >
                                    <span className="badge bg-primary rounded-pill">datum</span>
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" ></input>
                                </div>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Morbi leo risus
                                <div className='d-flex justify-content-between' >
                                    <span className="badge bg-primary rounded-pill">datum</span>
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" ></input>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className='row'>
                        show finished to dos
                        <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Cras justo odio
                                <div className='d-flex justify-content-between' >
                                    <span className="badge bg-primary rounded-pill">datum</span>
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" ></input>
                                </div>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Dapibus ac facilisis in
                                <div className='d-flex justify-content-between' >
                                    <span className="badge bg-primary rounded-pill">datum</span>
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" ></input>
                                </div>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Morbi leo risus
                                <div className='d-flex justify-content-between' >
                                    <span className="badge bg-primary rounded-pill">datum</span>
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" ></input>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
