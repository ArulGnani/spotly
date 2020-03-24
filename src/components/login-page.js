import React, { useState, useEffect } from 'react'
import cookies from 'js-cookie'
import MainPage from './main-page'
import './style.css'

const Main = () => {
    const [login,setLogin] = useState(false)
    const client_id = "b96984e2f4f348858f5a04856e28b968"
    const redirect = "http://localhost:3000/"
    const scope = 'user-read-currently-playing user-read-playback-state'
    const state = "sample123"
    const url = `https://accounts.spotify.com/authorize?response_type=token&
                 client_id=${encodeURIComponent(client_id)}
                 &scope=${encodeURIComponent(scope)}
                 &redirect_uri=${encodeURIComponent(redirect)}
                 &state=${encodeURIComponent(state)}`
    
    console.log(url)
    
    useEffect(() => {
        let access_token = cookies.get("access_token")
        let refresh_token = cookies.get("refresh_token")
        console.log(access_token,refresh_token)
        if(access_token && refresh_token){
            setLogin(true)
        }else{
            if (access_token === undefined || refresh_token === undefined){
                alert("login to access the home page!...")
            }else{
                alert("login can't get access-token from server")
            }
        }
    },[document.cookie])

    if (login){
        return <MainPage />
    }

    return (
        <div className="login-comp">
            <button className="login-button">
                <a href="http://localhost:5000/login" 
                onClick={() => setLogin(true)}>
                    login with spotify
                </a>
            </button> 
        </div>
    )
}

export default Main