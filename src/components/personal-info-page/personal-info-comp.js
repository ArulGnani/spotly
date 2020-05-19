import React,{ useState } from 'react'
import { Redirect } from 'react-router-dom'
import DefaultImg from './static-assects/default.png'
import Logout from './logout-comp'
import './style/personal-info-comp.css'

const PersonalInfo = (props) => {
    const [go,setGo] = useState(false)

    if (go){
        return ( <Redirect to="/recommendations"/>)
    }
    return (
        <section id="info">
            <img 
                id="profile-pic"
                src={ props.info.url ? props.info.url : DefaultImg }
            />
            <h1 id="name">{props.info.name}</h1>
            <Logout/>
            <button onClick={() => setGo(true)} className="rec">
                recommended song's
            </button>
        </section>
    )
}

export default PersonalInfo