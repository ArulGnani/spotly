import React,{ useEffect, useState } from 'react'
// import { Redirect } from 'react-router-dom'
import _404 from '../../not-authendicated'
import TopArtists from './top-artist-comp'
import TopTracks from './top-tracks-comp'
import PersonalInfo from './personal-info-comp'
import './style/personlize-comp.css'

const Personal = () => {
    const [auth,setAuth] = useState(false)
    const [topArtists,setTopArtist] = useState([]) 
    const [topTracks,setTopTracks] = useState([]) 
    const [personalInfo,setPersonalInfo] = useState({
        name : "",imgUrl: "",followers: 0
    })

    useEffect(() => {
        const token = sessionStorage.getItem("access-token")
        const tracks = sessionStorage.hasOwnProperty("top-tracks")
        const artists = sessionStorage.hasOwnProperty("top-artists")
        const personal = sessionStorage.hasOwnProperty("personal-info")
        if (token) {
            if (tracks && artists){
                setAuth(true)
                let artists = JSON.parse(sessionStorage.getItem("top-artists"))
                let tracks = JSON.parse(sessionStorage.getItem("top-tracks"))
                let personal = JSON.parse(sessionStorage.getItem("personal-info"))
                setTopArtist(artists)
                setTopTracks(tracks)
                setPersonalInfo(personal)
            }
            if (!artists) usersTopArtists(token)
            if (!tracks) usersTopTrack(token)
            if (!personal) getPersonalInfo(token)
        } else {
            setAuth(false)
        }
    },[]) 

    const saveItLocal = (id,data) => {
        sessionStorage.removeItem(id)
        sessionStorage.setItem(id,JSON.stringify(data))
        return true
    }

    const getPersonalInfo = (token) => {
        fetch("https://api.spotify.com/v1/me",{
            method : "GET",
            headers : {
                "Accept" : "application/json",
                "Authorization" : `"Bearer ${token}"`
            }
        })
        .then(res => res.json())
        .then(data => {
            let name = data.display_name
            let imgUrl = data.images[0] ? data.images[0].url : ""
            let followers = data.followers.total
            let obj = {name,imgUrl,followers}
            setPersonalInfo(obj)
            saveItLocal("personal-info",obj)
        })
    }

    const usersTopArtists = (token) => {
        fetch("https://api.spotify.com/v1/me/top/artists?limit=50",{
            method : "GET",
            headers : {
                "Accept" : "application/json",
                "Authorization" : `"Bearer ${token}"`
            }
        })
        .then(res => res.json())
        .then(data => {
            let artists = [...data.items]
            setTopArtist(artists)
            saveItLocal("top-artists",artists)
        })
    }

    const usersTopTrack = (token) => {
        fetch("https://api.spotify.com/v1/me/top/tracks?limit=50",{
            method : "GET",
            headers : {
                "Accept" : "application/json",
                "Authorization" : `"Bearer ${token}"`
            }
        })
        .then(res => res.json())
        .then(data => {
            let tracks = [...data.items]
            setTopTracks(tracks)
            saveItLocal("top-tracks",tracks)
        })
    }

    if (auth === false) {
        return ( <_404/> )
    }

    return (
        <main>
            <PersonalInfo info={personalInfo}/>
            <div id="top">
                <TopArtists artists={topArtists}/>
                <TopTracks tracks={topTracks}/>
            </div>
        </main>
    )
}

export default Personal