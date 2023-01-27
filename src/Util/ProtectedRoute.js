import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute() {
    return (
        
        localStorage.getItem("userData") ? <Outlet /> : <Navigate to={"/login"}/>
    )
}

export default ProtectedRoute