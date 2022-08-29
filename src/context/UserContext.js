import React, {createContext, useEffect, useState} from 'react'
import axios from 'axios'
import querystring from "querystring-es3";

export const UserContext = createContext({})

function UserContextProvider({children}){
    const [spotifyToken, setSpotifyToken] = useState({hasToken: false, token:'', refreshToken: ''})
    const [setlists, updateSetlists] = useState([])
    const [deviceID, setDeviceID] = useState('')
    const [userID, setUserID] = useState('')
    const [playSong, togglePlaySong] = useState(false)
    const [pauseSong, togglePauseSong] = useState(false)
    const [createSetlist, toggleCreateSetlist] = useState()
    const [trackUri, setTrackUri] = useState('')
    const [useSpotify, setUseSpotify] = useState()
    const [accessCode, setAccessCode] = useState('')

    const client_id = process.env.REACT_APP_SPOTIFY_API_CLIENT_ID
    const client_secret = process.env.REACT_APP_SPOTIFY_API_CLIENT_SECRET
    const currentTime = new Date().getTime().valueOf() / 1000

    function checkForAuthorizationCode(){
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)
        const code = urlParams.get('code')
        if (code){
            setAccessCode(code)
            toggleCreateSetlist(true)
        }
    }

    useEffect(() => {
        checkForAuthorizationCode()
    }, [])

    useEffect(() => {
    async function getAccesToken(){
        if (accessCode) {
            try {
                const {data} = await axios.post('https://accounts.spotify.com/api/token',
                    querystring.stringify({
                        code: accessCode,
                        redirect_uri: "http://localhost:3000/new-setlist",
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
                console.log(data)
                const expirationTime = currentTime + data.expires_in
                localStorage.setItem('access_token', data.access_token)
                localStorage.setItem('refresh_token', data.refresh_token)
                setSpotifyToken({
                    spotifyToken,
                    hasToken: true,
                    token: data.access_token,
                    refreshToken: data.refresh_token,
                    expirationTime: expirationTime
                })
                setUseSpotify(true)
            } catch (e) {
                console.error(e)
            }

        }
    } getAccesToken()
    }, [accessCode])


    if(currentTime >= spotifyToken.expirationTime) {
        refreshAuthorizationCode()
    }
        async function refreshAuthorizationCode() {
            const currentTime = new Date().getTime().valueOf() / 1000

            try {
                const {data} = await axios.post('https://accounts.spotify.com/api/token',
                    querystring.stringify({
                        grant_type: "refresh_token",
                        refresh_token: spotifyToken.refreshToken,
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
                setSpotifyToken({
                    ...spotifyToken,
                    hasToken: true,
                    token: data.access_token,
                    expirationTime: expirationTime
                })
            } catch (e) {
                console.error(e.response.data.error)
            }
        }


    function addSetlist(nameOfSetlist, listOfSongs, useSpotify) {
        if (setlists.length === 0){
            updateSetlists([{
                setlistName: nameOfSetlist,
                setlistArray: listOfSongs,
                useSpotify: useSpotify
            }])
        } else{
                updateSetlists([...setlists,
                    {setlistName: nameOfSetlist,
                        setlistArray: listOfSongs,
                        useSpotify: useSpotify
                    }])
        }
    }

    useEffect(() => {
        if (spotifyToken.hasToken){
            async function getDeviceID(){
                try {
                    const {data} = await axios.get('https://api.spotify.com/v1/me/player/devices', {
                            headers: {
                                "Authorization": `Bearer ${spotifyToken.token}`
                            }}
                            )
                    const findDeviceIndex = data.devices.indexOf("Computer")
                    setDeviceID(data.devices[findDeviceIndex + 1].id)
                } catch (e) {
                    console.error(e)
                }
            }
            getDeviceID()
            async function getUserID(){
                try{
                    const {data} = await axios.get('https://api.spotify.com/v1/me', {
                        headers: {
                            "Authorization": `Bearer ${spotifyToken.token}`
                        }}
                        )
                    setUserID(data.id)
                } catch(e){
                    console.error(e)
                }
            }
            getUserID()
        }}, [spotifyToken.hasToken])

    useEffect(() => {
        if(deviceID && playSong) {
                async function play() {
                    try {
                        await axios.put(`https://api.spotify.com/v1/me/player/play?${
                                querystring.stringify({
                                    device_id: deviceID
                                })}`, {
                                "uris": [trackUri],
                                "offset": {
                                    "position": 0
                                },
                                "position_ms": 0
                            }, {
                                headers: {
                                    "Authorization": `Bearer ${spotifyToken.token}`,
                                }
                            }
                        )
                    } catch (e) {
                        console.error(e.response.data.error)
                    }
                }play()
            }
        }, [playSong])


    useEffect(() => {
        if (playSong === true) {
            async function pause() {
                try {
                    await axios.put(`https://api.spotify.com/v1/me/player/pause?${
                        querystring.stringify(
                            {
                                device_id: deviceID
                            }
                        )}`, {}, {
                        headers: {
                            "Authorization": `Bearer ${spotifyToken.token}`,
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        }
                    })
                    togglePlaySong(false)
                    togglePauseSong(false)
                } catch (e) {
                    console.error(e)
                    togglePlaySong(false)
                    togglePauseSong(false)
                }
            } pause()
            }}, [pauseSong])


    function playPause(){
        if(playSong === false){
            togglePlaySong(true)
        } else {
            togglePauseSong(true)
        }
    }

    const userData = {
        setlists: setlists,
        updateSetlists: updateSetlists,
        addSetlist: addSetlist,
        playPause: playPause,
        spotifyToken: spotifyToken,
        client_id: client_id,
        client_secret: client_secret,
        createSetlist: createSetlist,
        toggleCreateSetlist: toggleCreateSetlist,
        trackUri: trackUri,
        setTrackUri: setTrackUri,
        playSong: playSong,
        useSpotify: useSpotify,
        setUseSpotify: setUseSpotify,
        accessCode: accessCode,
        deviceID: deviceID,
        userID: userID
    }

    return(
        <UserContext.Provider value={userData}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider