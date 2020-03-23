import React, { useState, useEffect } from 'react'
import cookies from 'js-cookie'
import MainPage from './main-page'
import './style.css'

const Main = () => {
    const [login,setLogin] = useState(false)
    
    // window.addEventListener("beforeunload",(event) => {
    //     event.preventDefault()
    //     cookies.remove("access_token")
    //     cookies.remove("refresh_token")
    //     alert("window closing!...")
    //     return event.returnValue = "this session is closed login again to access///"
    // })

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
                <a href="https://spot-ly.herokuapp.com/login" 
                onClick={() => setLogin(true)}>
                    login with spotify
                </a>
            </button> 
        </div>
    )
}

export default Main