import React, {useContext, useEffect, useState} from 'react'
import './Profile.scss'
import Background from "../../components/Background/Background";
import {Button, MySetlistsButton, NewSetlistButton, ProfileButton} from "../../components/Button/Button";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";

function Profile() {
    const {authState, logout} = useContext(AuthContext)
    const [username, setUsername] = useState('')
    const [mailadres, setMailadres] = useState('')
    const navigate = useNavigate()
    const reloadCount = sessionStorage.getItem('reloadCount')


    useEffect(() => {
        setUsername(authState.user.username)
        setMailadres(authState.user.mail)
    }, [authState.isAuth])


    return (
        <Background
            classNameTop="background-top__large"
            classNameCenter="background-center"
            classNameBottom="background-bottom"
            topContent={
                <div className="profileContainer">
                    <ProfileButton
                        onClick={() => {
                            navigate("/home")
                        }}
                    />
                            <h2>
                                {username}
                            </h2>
                            <h2>
                                {mailadres}
                            </h2>
                    <Button
                        type="button"
                        onClick={logout}
                        buttonText="Logout"
                    />
                </div>
            }
            centerContent={
                <MySetlistsButton
                    onClick={() => {
                        navigate("/my-setlists")
                    }}
                />
            }
            bottomContent={
                <NewSetlistButton
                    onClick={() => {
                        navigate("/new-setlist")
                    }}
                />
            }/>
    )
}

export default Profile