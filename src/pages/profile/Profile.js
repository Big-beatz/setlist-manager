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
        function checkAuthorization(){
            if(authState.isAuth === false){
                navigate('/login')
            }
        }
        checkAuthorization()
    }, []);



    useEffect(() => {
        setTimeout(() => {
            setUsername(authState.user.username)
            setMailadres(authState.user.mail)
        }, 10)
    }, [])


    return (
        <Background
            classNameTop="background-top__large"
            classNameCenter="background-center"
            classNameBottom="background-bottom"
            topContent={
                <div className="profile">
                    <ProfileButton
                        onClick={() => {
                            navigate("/home")
                        }}
                    />
                    <div className ="profile--div">
                        <div className ="profile--div__username">
                            <h2 className="profile--h2">
                                Username:
                            </h2>
                            <br/>
                            <p className="profile--p">
                                {username}
                            </p>
                        </div>
                        <div className ="profile--div__mailadres">
                            <h2 className="profile--h2">
                                Mailadres:
                            </h2>
                            <br/>
                            <p className="profile--p">
                                {mailadres}
                            </p>
                        </div>
                        <Button
                            className="logoutButton"
                            type="button"
                            onClick={logout}
                            buttonText="Logout"
                        />
                    </div>
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