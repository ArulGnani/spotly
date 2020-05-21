import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import './style/login-page.css'

const LoginPage = () => {
    const [login,setLogin] = useState(false)
    const client_id = "b49726fd8f9441c2bcf3a38e0da830cd"
    const redirect = "https://spotly-v2.netlify.app/"
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
            const token = hashParams["access_token"]
            sessionStorage.removeItem("access-token")
            sessionStorage.setItem("access-token",token)
            setLogin(true)
        }
    },[document.location.hash])

    useEffect(() => {
        let token = sessionStorage.hasOwnProperty("access-token")
        if (token) {
            setLogin(true)
        } else { 
            console.log("can't access access token")
        }
    },[])

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