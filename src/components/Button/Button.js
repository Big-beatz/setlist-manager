import React from 'react'
import './Button.scss'


export function Button({children, className, type, onClick}){
    return(
        <button
            type={type}
            onClick={onClick}
            className={className}>
            <span>{children}</span>
        </button>
    )
}

export function ProfileButton({onClick}){
    return(
        <Button
        type="button"
        className="profile-button"
        onClick={onClick}
    >
        Profile
    </Button>
    )
}

export function MySetlistsButton({onClick}){
    return(
        <Button
            type="button"
            className="my-setlists-button"
            onClick={onClick}
        >
            My Setlists
        </Button>
    )
}

export function NewSetlistButton({onClick}){
    return(
        <Button
            type="button"
            onClick={onClick}
            className="new-setlist-button"
        >
            New Setlist
        </Button>
    )
}
