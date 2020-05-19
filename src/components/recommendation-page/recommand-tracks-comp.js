import React from 'react'

const Track = (props) => {
    return (
        <div className="track">
            <a href={props.track.album.external_urls.spotify} target="_blank" className="main">
                <img src={props.track.album.images[0].url} width="70px" height="70px"/> 
                <h3 className="name">{props.track.album.name}</h3>
            </a>
        </div>
    )
}

export default Track