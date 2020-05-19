import React,{ useState } from 'react'
import { Redirect } from 'react-router-dom'
import './style/logout-comp.css'

const Logout = () => {
    const [logout,setLogout] = useState(false)
    
    const delLocal = () => {
        sessionStorage.clear()
        setLogout(true)
    }

    if (logout) {
        return ( <Redirect to="/"/> )
    }
    
    return ( 
        <button onClick={delLocal} id="logout">
            <h1> Logout </h1>
        </button> 
    )
}

export default Logout