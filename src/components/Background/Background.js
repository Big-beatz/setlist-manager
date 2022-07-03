import React from 'react'
import './Background.scss'

function Background(props){
    return(
    <div className="background">
        <div className="background__top">{props.top}</div>
        <div className="background__center">{props.center}</div>
        <div className="background__bottom">{props.bottom}</div>
    </div>
        )
}

export default Background