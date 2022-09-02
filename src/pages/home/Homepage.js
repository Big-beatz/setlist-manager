import Background from "../../components/Background/Background";
import {ProfileButton, MySetlistsButton, NewSetlistButton} from "../../components/Button/Button";
import React, {useContext, useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext/AuthContext";
import {UserContext} from "../../context/UserContext/UserContext";
import querystring from "querystring-es3";


function Homepage(){
    const {authState} = useContext(AuthContext)
    const {client_id} = useContext(UserContext)
    const [redirect, toggleRedirect] = useState(false)
    const [className, setClassName] = useState({navigationButton: 'navigation--fade-in'})
    const navigate = useNavigate()
    const reloadCount = sessionStorage.getItem('reloadCount')

    useEffect(() => {
        if(reloadCount < 1) {
            toggleRedirect(true)
            sessionStorage.setItem('reloadCount', String(reloadCount + 1));
            window.location.replace('https://accounts.spotify.com/authorize?' +
                querystring.stringify({
                    client_id: client_id,
                    response_type: "code",
                    redirect_uri: "http://localhost:3000/home",
                    scope: "streaming playlist-modify-public playlist-modify-private user-read-playback-state"
                }))        }
        setTimeout(() =>
        {checkAuthorization()}, 500)
    }, []);

    function checkAuthorization(){
        if(authState.isAuth === false){
            navigate('/login')
        }
    }

    function handleNavigationButton(navigationLink){
        setClassName({
            ...className,
            navigationButton: 'navigation--fade-out'
        })
        setTimeout(() => {
            navigate(navigationLink)
        }, 1000)
    }

    return(
        <>
        { redirect ?
            <p>Redirecting</p>
            :
            <Background
                classNameTop="background-top"
                classNameCenter="background-center"
                classNameBottom="background-bottom"
                topContent={
                    <div className={className.navigationButton}>
                        <ProfileButton
                            onClick={() => {
                                handleNavigationButton("/profile")
                            }}
                        />
                    </div>
                }
                centerContent={
                    <div className={className.navigationButton}>
                        <MySetlistsButton
                            onClick={() => {
                                handleNavigationButton("/my-setlists")

                            }}

                        />
                    </div>
                }
                bottomContent={
                    <div className={className.navigationButton}>
                        <NewSetlistButton
                            onClick={() => {
                                handleNavigationButton("/new-setlist")
                            }}

                        />
                    </div>
                }
            />
        }
        </>
    )
}

export default Homepage