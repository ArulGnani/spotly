import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import './style/login-page.css'

const LoginPage = () => {
    const [login,setLogin] = useState(false)
    const client_id = "1c99548c4b15409e999781f32a4d6771"
    const redirect = "http://localhost:3000/"
    const scope = 'user-top-read'
    const state = "sample123"
    let url = "https://accounts.spotify.com/authorize?response_type=token&"
    url += 'client_id=' + encodeURIComponent(client_id)
    url += '&scope=' + encodeURIComponent(scope)
    url += '&redirect_uri=' + encodeURIComponent(redirect)
    url += '&state=' + encodeURIComponent(state) 
    
    // get token from query string after spotify-OAuth 
    useEffect(() => {
        if (document.location.hash){
            let hashParams = {}
            let e, r = /([^&;=]+)=?([^&;]*)/g,
            q = document.location.hash.substring(1)
            while ( e = r.exec(q)) {
                hashParams[e[1]] = decodeURIComponent(e[2])
            }
            if (hashParams["access_token"] === ""){
                alert("can't get access_token")
            }
            setLogin(true)
            const token = hashParams["access_token"]
            sessionStorage.removeItem("access-token")
            sessionStorage.setItem("access-token",token)
        }
    },[document.location.hash])

    if (login) {
        return ( <Redirect to="/personal"/> )
    }

    return (
        <div className="login">
        <button className="login-button">
            <a href={url}> login with spotify</a>
        </button> 
        </div>
    )
}

export default LoginPage