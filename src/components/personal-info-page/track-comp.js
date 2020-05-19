import React from 'react'
import './style/track-comp.css'

const Track = (props) => {
    return (
        <div className="track">
            <a href={props.track.external_urls.spotify} target="_blank" className="track-main">
                <img src={props.track.album.images[1].url} height="80px" width="80px"/>
                <div className="content">
                    <h3 className="name">{props.track.name}</h3>
                    <div className="info">
                        {props.track.artists.map(artist => {
                            return (
                                <p key={artist.id} className="artist-name">
                                    {artist.name}
                                </p>        
                            )
                        })}
                    </div>
                </div>
            </a>
        </div>
    )
}

export default Track