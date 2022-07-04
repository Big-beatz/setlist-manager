import './Input.scss'
import React from 'react'

function Input(label, inputType, value, onChange, children, inputClass){
    return(
        <>
            <label>{label}
                <input
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    className={inputClass}
                />
            </label>
        </>
    )
}

export default Input