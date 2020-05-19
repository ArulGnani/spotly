import React from 'react'
import './style/artist-comp.css'

const Artist = (props) => {
    return (
        <div className="artist">
            <a href={props.open} target="_blank" className="main">
                <img src={props.imgUrl} height="100px" width="100px"/>
                <p>{props.name}</p>
            </a>
        </div>
    )
}

export default Artist