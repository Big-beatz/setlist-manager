import React from 'react'
import './Button.scss'

function Button({children, className}){
    return(
        <button type="button" className={className}>{children}</button>
    )
}

export default Button