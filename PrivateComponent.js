import React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const PrivateComponent=()=>
{
    // const navigate = useNavigate()
    const auth = localStorage.getItem('user')
    
    return (auth ? <Outlet /> : <Navigate to='/signup' />)
 
    // navigate('/signup')
}
export default PrivateComponent;

