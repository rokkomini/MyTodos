import React from 'react'
import { HiHome } from "react-icons/hi";

export default function LoginHeader({header}) {
    return (
        <div>
            <h1 className="text-center mb-3">
                <HiHome /> <br />  
                {header}
            </h1>
        </div>
    )
}
