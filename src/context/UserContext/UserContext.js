import React, {createContext, useContext, useEffect, useState} from 'react'
import axios from 'axios'
import querystring from "querystring-es3";
import {AuthContext} from "../AuthContext/AuthContext";

export const UserContext = createContext({})

function UserContextProvider({children}){
    const {authState} = useContext(AuthContext)
    const [spotifyData, updateSpotifyData] = useState({
        accessCode: '',
        hasToken: false,
        token: '',
        refreshToken: '',
        deviceID: '',
        userID: '',
        playSong: false,
        pauseSong: false,
        trackUri: ''
    })
    const [setlists, updateSetlists] = useState([])
    const [useSpotify, setUseSpotify] = useState()
    const [error, toggleError] = useState({
        loginError: false,
        playError: false,
        searchError: false,
        deviceError: false,
        userError: false,
        spotifyAuthError: false,
        spotifyRefreshError: false,
        updateAuthInfoError: false
    })

    const client_id = process.env.REACT_APP_SPOTIFY_API_CLIENT_ID
    const client_secret = process.env.REACT_APP_SPOTIFY_API_CLIENT_SECRET
    const currentTime = new Date().getTime().valueOf() / 1000

    function checkForAuthorizationCode(){
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)
        const code = urlParams.get('code')
        if (code){
            updateSpotifyData({
                ...spotifyData,
                accessCode: code
            })
        }
    }

    useEffect(() => {
        checkForAuthorizationCode()
    }, [])

    useEffect(() => {
        if (spotifyData.accessCode){
            async function getAccesToken(){
            try {
                const {data} = await axios.post('https://accounts.spotify.com/api/token',
                    querystring.stringify({
                        code: spotifyData.accessCode,
                        redirect_uri: "http://localhost:3000/home",
                        grant_type: "authorization_code",
                        client_id: client_id,
                        client_secret: client_secret
                    }),
                    {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        json: true
                    })
                const expirationTime = currentTime + data.expires_in
                localStorage.setItem('access_token', data.access_token)
                localStorage.setItem('refresh_token', data.refresh_token)
                updateSpotifyData({
                    ...spotifyData,
                    hasToken: true,
                    token: data.access_token,
                    refreshToken: data.refresh_token,
                    expirationTime: expirationTime
                })
                toggleError({
                    ...error,
                    spotifyAuthError: false
                })
            } catch (e) {
                console.error(e)
                toggleError({
                    ...error,
                    spotifyAuthError: true
                })
            }
        } getAccesToken()
    }
    }, [spotifyData.accessCode])


    if(currentTime >= spotifyData.expirationTime) {
        refreshAuthorizationCode()
    }
        async function refreshAuthorizationCode() {
            const currentTime = new Date().getTime().valueOf() / 1000
            console.log("Ik word uitgevoerd")
            try {
                const {data} = await axios.post('https://accounts.spotify.com/api/token',
                    querystring.stringify({
                        grant_type: "refresh_token",
                        refresh_token: spotifyData.refreshToken,
                        client_id: client_id,
                        client_secret: client_secret
                    }),
                    {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        json: true
                    })
                const expirationTime = currentTime + data.expires_in
                updateSpotifyData({
                    ...spotifyData,
                    hasToken: true,
                    token: data.access_token,
                    expirationTime: expirationTime
                })
                toggleError({
                    ...error,
                    spotifyRefreshError: false
                })
            } catch (e) {
                toggleError({
                    ...error,
                    spotifyRefreshError: true
                })
            }
        }

    useEffect(() => {
        function checkForSetlists() {
            if (authState.user === null){
                updateSetlists([])
            }
            else {
                updateSetlists(authState.user.info)
                }
        }
        checkForSetlists()
    }, [authState.user])

    useEffect(() => {
        if (spotifyData.hasToken){
            async function getDeviceID(){
                try {
                    const {data} = await axios.get('https://api.spotify.com/v1/me/player/devices', {
                            headers: {
                                "Authorization": `Bearer ${spotifyData.token}`
                            }}
                            )
                    const findDeviceIndex = data.devices.indexOf("Computer")
                    updateSpotifyData({
                        ...spotifyData,
                        deviceID: data.devices[findDeviceIndex + 1].id
                    })
                    toggleError({
                        ...error,
                        deviceError: false
                    })
                } catch (e) {
                    toggleError({
                        ...error,
                        deviceError: true
                    })
                }
            }getDeviceID()
        }}, [spotifyData.hasToken])

    useEffect(() =>{
        async function getUserID(){
            try{
                const {data} = await axios.get('https://api.spotify.com/v1/me', {
                    headers: {
                        "Authorization": `Bearer ${spotifyData.token}`
                    }}
                )
                updateSpotifyData({
                    ...spotifyData,
                    userID: data.id,
                })
                toggleError({
                    ...error,
                    userError: false
                })
            } catch(e){
                toggleError({
                    ...error,
                    userError: true
                })
                console.error(e)
            }
        }
        getUserID()
    }, [spotifyData.deviceID])


    useEffect(() => {
        if(spotifyData.deviceID && spotifyData.playSong) {
                async function play() {
                    try {
                        await axios.put(`https://api.spotify.com/v1/me/player/play?${
                                querystring.stringify({
                                    device_id: spotifyData.deviceID
                                })}`, {
                                "uris": [spotifyData.trackUri],
                                "offset": {
                                    "position": 0
                                },
                                "position_ms": 0
                            }, {
                                headers: {
                                    "Authorization": `Bearer ${spotifyData.token}`,
                                    "Accept": "application/json",
                                    "Content-Type": "application/json"
                                }, json: true
                            }
                        )
                        toggleError({
                            ...error,
                            playError: false
                        })
                    } catch (e) {
                        toggleError({
                            ...error,
                            playError: true
                        })
                        updateSpotifyData({
                            ...spotifyData,
                            playSong: false
                        })
                        console.error(e.response.data.error)
                    }
                }play()
            }
        }, [spotifyData.playSong])

    useEffect(() => {
        if (spotifyData.playSong === true) {
            async function pause() {
                try {
                    await axios.put(`https://api.spotify.com/v1/me/player/pause?${
                        querystring.stringify(
                            {
                                device_id: spotifyData.deviceID
                            }
                        )}`, {}, {
                        headers: {
                            "Authorization": `Bearer ${spotifyData.token}`,
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        }
                    })
                    updateSpotifyData({
                        ...spotifyData,
                        playSong: false,
                        pauseSong: false
                    })
                } catch (e) {
                    console.error(e)
                    updateSpotifyData({
                        ...spotifyData,
                        playSong: false,
                        pauseSong: false
                    })
                }
            }pause()
        }}, [spotifyData.pauseSong])

    function playPause(trackUri){
        if(spotifyData.playSong === false){
            updateSpotifyData({
                ...spotifyData,
                trackUri: trackUri,
                playSong: true
            })
        } else {
            updateSpotifyData({
                ...spotifyData,
                pauseSong: true
            })
        }
    }

    const userData = {
        setlists: setlists,
        updateSetlists: updateSetlists,
        playPause: playPause,
        spotifyData: spotifyData,
        updateSpotifyData: updateSpotifyData,
        client_id: client_id,
        client_secret: client_secret,
        useSpotify: useSpotify,
        setUseSpotify: setUseSpotify,
        error: error,
        toggleError: toggleError
    }

    return(
        <UserContext.Provider value={userData}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider