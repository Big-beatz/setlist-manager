import React from 'react'
import './Button.scss'


export function Button({id, className, type, onClick, buttonText}){
    return(
        <button
            type={type}
            onClick={onClick}
            className={className}
            id={id}
           >
            <span>{buttonText}</span>
        </button>
    )
}

export function DisabledButton({className, type, onClick, buttonText}){
    return(
        <button
            type={type}
            onClick={onClick}
            className={className}
            disabled
        >
            <span>{buttonText}</span>
        </button>
    )
}

export function ProfileButton({onClick}){
    return(
        <Button
        type="button"
        className="profile-button"
        onClick={onClick}
        buttonText="Profile"
    />
    )
}

export function MySetlistsButton({onClick}){
    return(
        <Button
            type="button"
            className="my-setlists-button"
            onClick={onClick}
            buttonText="My setlists"
        />

    )
}

export function NewSetlistButton({onClick}){
    return(
        <Button
            type="button"
            onClick={onClick}
            className="new-setlist-button"
            buttonText="New Setlist"
        />
    )
}
