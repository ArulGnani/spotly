import React,{ useEffect } from 'react'
import Track from './track-comp'
import './style/top-tracks-comp.css'

const TopTracks = (props) => {
    return (
        <section id="tracks">
            <div id="header">
                <h3>Your Top Traks</h3>
                <button>All time</button>
            </div>
            { props.tracks.map(info => <Track track={info} key={info.id}/>) }
        </section>
    )
}

export default TopTracks