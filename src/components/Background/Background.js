import React from 'react'
import './Background.scss'
import Navbar from "../Navbar/Navbar";

function Background(props){
    return(
        <div className="background-container">
            <div className="background">
                <div className={props.classNameTop}>
                    {props.topContent}
                </div>
                <div className={props.classNameCenter}>
                    {props.centerContent}
                </div>
                <div className={props.classNameBottom}>
                    {props.bottomContent}
                </div>
            </div>
        </div>
        )
}

export default Background