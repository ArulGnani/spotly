import React, { useState, useEffect } from 'react'
import MainPage from './main-page'
import './style.css'

const Main = () => {
    const [login,setLogin] = useState(false)
    const client_id = "b96984e2f4f348858f5a04856e28b968"
    const redirect = "https://spotly.netlify.com/"
    const scope = 'user-read-currently-playing user-read-playback-state'
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
            if (hashParams["access_token"] !== ""){
                let token = sessionStorage.getItem("access_token")
                if (token){
                    sessionStorage.removeItem("access_token")
                    sessionStorage.setItem("access_token",hashParams["access_token"])
                    window.location.replace("https://spotly.netlify.com/")
                }else{
                    sessionStorage.setItem("access_token",hashParams["access_token"])
                    window.location.replace("https://spotly.netlify.com/")
                }
            }else{
                alert("can't get access_token")
            }
        }
    },[document.location.hash])

    useEffect(() => {
        // let access_token = cookies.get("access_token")
        let access_token = sessionStorage.getItem("access_token")
        if(access_token){
            setLogin(true)
        }else{
            if (access_token === undefined){
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
                <a href={url} 
                onClick={() => setLogin(true)}>
                    login with spotify
                </a>
            </button> 
        </div>
    )
}

export default Main