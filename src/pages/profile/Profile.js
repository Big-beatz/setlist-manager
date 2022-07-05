import React from 'react'
import './Profile.scss'
import Background from "../../components/Background/Background";
import {MySetlistsButton, NewSetlistButton, ProfileButton} from "../../components/Button/Button";
import {useNavigate} from "react-router-dom";

function Profile(){
    const navigate = useNavigate()

    return(
        <Background
            classNameTop="background-top__large"
            classNameCenter="background-center"
            classNameBottom="background-bottom"
            topContent={
                <div className="profileContainer">
                    <ProfileButton
                    onClick={() => {navigate("/home")}}
                    />
                    <h2>
                        Profielnaam
                    </h2>
                    <h2>
                        Mailadres
                    </h2>
                </div>
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
        }/>
    )
}

export default Profile