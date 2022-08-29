import React, {useContext, useEffect, useState} from 'react'
import './NewSetlist.scss'
import axios from 'axios'
import Background from "../../components/Background/Background";
import {
    Button,
    DisabledButton,
    MySetlistsButton,
    NewSetlistButton,
    ProfileButton
} from "../../components/Button/Button";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../../context/UserContext";
import CreateSpotifySetlist from "../../components/CreateSetlist/CreateSpotifySetlist";
import {AuthContext} from "../../context/AuthContext";
import querystring from "querystring-es3";
import spotifyIcon from '../../assets/icons/Spotify_logo_without_text.svg.png'

function NewSetlist(){

    const navigate = useNavigate()
    const {
        setlists,
        updateSetlists,
        client_id,
        createSetlist,
        toggleCreateSetlist,
        useSpotify,
        setUseSpotify,
        accessCode
    } = useContext(UserContext)
    const {authState} = useContext(AuthContext)

    const spotifyAPI =  "https://api.spotify.com/v1"



    useEffect(() => {
        function checkAuthorization(){
            if(authState.isAuth === false){
                navigate('/login')
            }
        }
        checkAuthorization()
    }, []);

    function saveDataToLocalStorage(data)
    {
        let setlists = [];
        // Parse the serialized data back into an aray of objects
        updateSetlists(JSON.parse(localStorage.getItem('session')) || []) ;
        // Push the new data (whether it be an object or anything else) onto the array
        setlists.push(data);
        // Re-serialize the array back into a string and store it in localStorage
        localStorage.setItem('session', JSON.stringify(setlists));
    }

    function handleSubmit(e){
        e.preventDefault()
        if(useSpotify && !accessCode) {
            saveDataToLocalStorage()
            window.location.replace('https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                client_id: client_id,
                response_type: "code",
                redirect_uri: "http://localhost:3000/new-setlist",
                scope: "streaming playlist-modify-public playlist-modify-private user-read-playback-state"
            }))
        } else {
            toggleCreateSetlist(true)
        }
    }


    return(
    <Background
        classNameTop="background-top"
        classNameCenter="background-center"
        classNameBottom="background-bottom__large"
        topContent={
            <ProfileButton
                onClick={() => {
                    navigate("/profile")
                    toggleCreateSetlist(false)
                }}
            />
        }
        centerContent={
            <MySetlistsButton
                onClick={() => {
                    navigate("/my-setlists")
                    toggleCreateSetlist(false)
                }}
            />
        }
        bottomContent={
            <>
                {createSetlist ?
                    <CreateSpotifySetlist/>
                    :
                    <div className="new-setlist">
                        <NewSetlistButton
                            onClick={() => {
                                navigate("/home")
                            }}
                        />
                        {setlists.length < 6 ?
                            <form
                                className="new-setlist--form"
                                onSubmit={handleSubmit}
                            >
                                <legend
                                    className="new-setlist--legend"
                                >
                                    Do you want to use Spotify?
                                        <img
                                        className="new-setlist--img"
                                        src={spotifyIcon}
                                        alt="Spotify Icon"
                                        />
                                </legend>
                                <div className="new-setlist-radio">
                                    <label htmlFor="useSpotify">
                                        <input
                                            type="radio"
                                            name="useSpotify"
                                            id="useSpotify"
                                            onClick={() => setUseSpotify(true)}
                                        />
                                        Yes
                                    </label>
                                    <label htmlFor="dontUseSpotify">
                                        <input
                                            type="radio"
                                            id="dontUseSpotify"
                                            name="useSpotify"
                                            onClick={() => setUseSpotify(false)}
                                        />
                                        No
                                    </label>
                                </div>
                                { useSpotify === false || useSpotify === true ?
                                    <Button
                                        className="new-setlist--submit"
                                        type="submit"
                                        buttonText="Create Setlist"
                                    />
                                    :
                                    <DisabledButton
                                    className="new-setlist--disabled"
                                    buttonText="Create Setlist"
                                    />
                                }
                            </form>
                            :
                            <div className="new-setlist--maximum">
                                <h1>Oops</h1>
                                <br/>
                                <p>The maximum number of setlists has been reached.</p>
                                <p>Please delete a setlist to make a new one.  </p>
                            </div>
                        }
                    </div>
                }
            </>
        }
    />
    )
}

export default NewSetlist