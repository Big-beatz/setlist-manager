import './Input.scss'
import React from 'react'

function Input({children, label, inputType, value, onChange, className, inputName}){
    return(
        <>
            <label>
                {label}
            </label>
            {children}
                <input
                    type={inputType}
                    value={value}
                    name={inputName}
                    onChange={onChange}
                    className={className}
                />

        </>
    )
}

export default Input