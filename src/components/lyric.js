import React, { useEffect, useState } from 'react'
import cookie from 'js-cookie'
import RenderLyric from './render-lyric'

const Lyric = (props) => {
    const [songs,setSongs] = useState("") 
    const [getLyric,setLyric] = useState(false)
    const [url,setUrl] = useState("")
    
    useEffect(() => {
        getAllSongs()
    },[])

    const getAllSongs = () => {
        let accessToken = cookie.get("access_token")
        console.log(props.songName)
        if (accessToken !== ""){
            fetch(`https://spotly-backend.herokuapp.com/find-lyric/${props.songName}`,{ 
                method : "GET",
                headers : {
                    "Access-Control-Allow-Origin" : true,
                    "Accept" : "application/json"
                } 
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data){
                    setSongs(data)
                }
            })
            .catch(err => {
                console.log(err)
                alert(err)
            })
        }else{
            alert("can't find access-token")
        }
    }

    const getLyrics = (event) => {
        let lyricUrl = event.target.getAttribute("lyricurl")
        // console.log(lyricUrl)
        setLyric(true)
        url !== "" ? setUrl("") : setUrl(lyricUrl)
    }

    if (getLyric){
        return <RenderLyric url={url}/>        
    }
    
    return (
        <div className="lyric-comp">
            <h2 className="lyric-head">relevent search result</h2>
            <div className="lyrics">
                {songs.length > 1 ? 
                    songs.map((ele,key) => {
                        return (
                            <div key={key} onClick={getLyrics}
                            className="ly">
                                <h3 lyricurl={ele.url}>
                                    {ele.name}
                                </h3>
                            </div>
                        )
                    }) : 
                    ""
                }
            </div>
        </div>
    )
}

export default Lyric