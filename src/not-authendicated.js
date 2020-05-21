import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

const NotAuthendicated = () => {
    const [home,toHome] = useState(false)

    if (home) {
        return ( <Redirect to="/"/> )
    }

    return (
        <div className="_404">
            your not authendicated...
            <button onClick={() => toHome(true)}>
                home 
            </button>
        </div>
    )
}

export default NotAuthendicated