import React from 'react'
import './Background.scss'

function Background(props){
    return(
    <div className="background">
        <div className="background--top">{props.top}</div>
        <div className="background--center">{props.center}</div>
        <div className="background--bottom">{props.bottom}</div>
    </div>
        )
}

export default Background