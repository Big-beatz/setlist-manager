import React from 'react'
import './Background.scss'
import Navbar from "../Navbar/Navbar";

function Background(props){
    return(
    <div className="background">
        <div className={props.classNameTop}>
            {props.topContent}
        </div>
        <div className="redOverlap" />
        <div className={props.classNameCenter}>
            {props.centerContent}
        </div>
        <div className="blueOverlap" />
        <div className={props.classNameBottom}>
            {props.bottomContent}
        </div>
    </div>
        )
}

export default Background