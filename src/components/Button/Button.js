import React from 'react'
import './Button.scss'
import {useNavigate} from 'react-router-dom'


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

export function ProfileButton(){
    const navigate = useNavigate()

    return(
        <Button
        type="button"
        className="profile-button"
        onClick={() => {navigate("/profile")}}
    >
        Profile
    </Button>
    )
}

export function MySetlistsButton(){
    const navigate = useNavigate()

    return(
        <Button
            type="button"
            className="my-setlists-button"
            onClick={() => {navigate("/my-setlists")}}
        >
            My Setlists
        </Button>
    )
}

export function NewSetlistButton(){
    const navigate = useNavigate()

    return(
        <Button
            type="button"
            onClick={() => {navigate("/new-setlist")}}
            className="new-setlist-button"
        >
            New Setlist
        </Button>
    )
}
