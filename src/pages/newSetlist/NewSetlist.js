import React from 'react'
import './NewSetlist.scss'
import Background from "../../components/Background/Background";
import {MySetlistsButton, NewSetlistButton, ProfileButton} from "../../components/Button/Button";
import {useNavigate} from "react-router-dom";

function NewSetlist(){
    const navigate = useNavigate()

    return(
        <Background
            classNameTop="background-top"
            classNameCenter="background-center"
            classNameBottom="background-bottom__large"
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
                    onClick={() => {navigate("/home")}}
                />
            }
        />
    )
}

export default NewSetlist