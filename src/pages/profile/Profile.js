import React, {useContext} from 'react'
import './Profile.scss'
import Background from "../../components/Background/Background";
import {Button, MySetlistsButton, NewSetlistButton, ProfileButton} from "../../components/Button/Button";
import {useNavigate} from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function Profile(){
    const {authData} = useContext(AuthContext)
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
                        {/*{authData.authState.user.username}*/}
                    </h2>
                    <h2>
                        {/*{authState.user.mail}*/}
                    </h2>
                    <Button
                        type="button"
                        onClick={() => {}}
                        buttonText="Logout"
                    />
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