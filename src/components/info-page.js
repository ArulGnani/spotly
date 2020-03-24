import React, { useState, useEffect } from 'react'
import Lyric from './lyric'
 
const Playing = () => {
    const [imgUrl,setImg] = useState("")
    const [songName,setSong] = useState("")
    const [openUrl,setOpen] = useState("")
    const [fullSongName,setName] = useState("")
    const [lyric,setLyric] = useState(false)

    useEffect(() => {
        getCurrentSong()
    },[])

    const getCurrentSong = () => {
        let access_token = sessionStorage.getItem("access_token")
        if (access_token){
            fetch("https://api.spotify.com/v1/me/player/currently-playing",{
                method : "GET",
                headers : {
                    "Accept" : "application/json",
                    "Authorization" : `"Bearer ${access_token}"`
                }
            })
            .then(res => res.json())
            .then(data => {
                data.item.album != null ? setImg(data.item.album.images[0].url) : alert("currently no song is played..")
                setOpen(data.item.external_urls.spotify)
                let song = data.item.name
                setName(song)
                validSongName(song)
            })
            .catch(err =>{
                alert(err)
            })
        }else{
            alert("can't access access_token...")
        }
    }

    const validSongName = (song) => {
        let arr = song.split("(")
        let songname = arr[0]
        songname = songname.replace(/\s/g,"+")
        setSong(songname.toLowerCase())
    }
    
    if (lyric){
        return <Lyric songName={songName}/>
    }

    return (
        <div className="playing">
            <img src={imgUrl}/>
            <h3 className="song-name">{fullSongName}</h3>
            <div className="btn-container">
                <button className="btn">
                    <a href={openUrl} target="_blank">
                        info
                    </a>
                </button>
                <button className="btn">| |</button>
                <button onClick={() => setLyric(true)} 
                className="btn">
                    lyric
                </button>
            </div>
        </div>
    )
}

export default Playing