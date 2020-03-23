import React,{ useEffect, useState } from 'react'

const RenderLyric = (props) => {
    const [lyric,setLyric] = useState("")
    
    useEffect(() => {
        getLyric()
    }, [props.url])
    
    const getLyric = () => {
        if (props.url){ 
            fetch("http://locahost:5000/lyric",{
                method : "POST",
                headers : {
                    "Accept" : "application/json",
                    "Access-Control-Allow-Origin" : true,
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({"lyricUrl" : props.url})
            })
            .then(res => res.json())
            .then(data => {
                if (data){
                    // console.log(data)
                    setLyric(data.lyric)
                }
            })
            .catch(err => {
                if (err) {
                    alert("error occured while requesting for lyric...")
                }
            })
        }else{
            alert("can't get lyric url..")
        }
    }

    return (
        <div className="lyric-render">
            <div dangerouslySetInnerHTML={{ __html : lyric }}/>
        </div>
    )
}

export default RenderLyric