import React from 'react'
import './Button.scss'

function Button({children, className, type, onClick}){
    return(
        <button
            type={type}
            onClick={onClick}
            className={className}>
            {children}
        </button>
    )
}

export default Button