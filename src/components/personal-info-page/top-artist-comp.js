import React,{ useState,useEffect } from 'react'
import Artist from './artist-comp'
import './style/top-artists-comp.css'

const TopArtist = (props) => {
    return (
        <section id="top-artist">
            <div id="header">
                <h3 id="title">Your Top Artists</h3>
                <button id="btn">All time</button>
            </div>
            { props.artists.map((artist) => {
                return <Artist
                            key={artist.id}
                            imgUrl={artist.images[1].url} 
                            name={artist.name} 
                            open={artist.external_urls.spotify}
                        />
                }
            )}
        </section>
    )
}

export default TopArtist