import './Homepage.scss'
import Background from "../../components/Background/Background";
import {ProfileButton, MySetlistsButton, NewSetlistButton} from "../../components/Button/Button";
import React from 'react'
import {useNavigate} from "react-router-dom";


function Homepage(){
    const navigate = useNavigate()

    return(
        <Background
            classNameTop="background-top"
            classNameCenter="background-center"
            classNameBottom="background-bottom"
        topContent={
            <ProfileButton
            onClick={() => {navigate("/profile")}}
            />
        }
        centerContent={
            <MySetlistsButton
                onClick={() => {navigate("/my-setlists")}}

            />
        }
        bottomContent={
            <NewSetlistButton
                onClick={() => {navigate("/new-setlist")}}

            />
        }
        />
    )
}

export default Homepage