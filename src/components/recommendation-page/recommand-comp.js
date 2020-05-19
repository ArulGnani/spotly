import React,{ useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import Track from './recommand-tracks-comp'
import './style/recommand-comp.css'

const Recommendation = () => {
    const [tracks,setTracks] = useState([]) 
    const [goHome,setHome] = useState(false)

    useEffect(() => {
        const token = sessionStorage.getItem("access-token")
        if (token){
            recommendedSongs(token)
        }
    },[])

    const recommendedSongs = (token) => {
        let allArtists = JSON.parse(sessionStorage.getItem("top-artists"))
        let top_10 = []
        allArtists.forEach(ar => {
            if (top_10.length < 10) top_10.push(ar.id)
        })
        let topArtist = top_10[Math.floor(Math.random() * top_10.length)]
        fetch(`https://api.spotify.com/v1/recommendations?seed_artists=${topArtist}&min_energy=0.5&min_popularity=80`,{
            method : "GET",
            headers : {
                "Accept" : "application/json",
                "Authorization" : `"Bearer ${token}"`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setTracks([...data.tracks])
        })
    }

    if (goHome) {
        return ( <Redirect to="/personal"/> )
    }

    return (
        <section id="main">
            <button onClick={() => setHome(true)} id="home-btn">
                home
            </button>
            <h4 className="intro">recommanded albums based on your lisiting</h4>
            { tracks.map(song => <Track key={song.id} track={song}/> )}
        </section>
    )
}

export default Recommendation