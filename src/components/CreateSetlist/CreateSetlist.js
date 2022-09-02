import React, {useContext, useEffect, useState} from 'react'
import './CreateSetlist.scss'
import {Button, DisabledButton} from "../Button/Button";
import {UserContext} from "../../context/UserContext/UserContext";
import {AuthContext} from "../../context/AuthContext/AuthContext";
import axios from "axios";
import querystring from "querystring-es3";
import playButton from '../../assets/icons/play-button-icon-png-18917.jpg'
import pauseButton from '../../assets/icons/61039.png'
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function CreateSetlist({toggleCreateSetlist}){
    const {token, setAuthState, authState} = useContext(AuthContext)
    const {
        setlists,
        updateSetlists,
        playPause,
        useSpotify,
        setUseSpotify,
        spotifyData,
        error,
        toggleError
    } = useContext(UserContext)
    const [nameOfSetlist, setNameOfSetlist] = useState('')
    const [songsArray, updateSongsArray] = useState([])
    const [newSong, setNewSong] = useState('')
    const [invalidInput, setInvalidInput] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [finish, toggleFinish] = useState(false)

    useEffect(() => {
        if (useSpotify) {
            async function searchQuery() {
                if (newSong.length === 0) {
                    setInvalidInput(false)
                } else if (newSong.indexOf(' ') === 0) {
                    setInvalidInput(true)
                    setSearchResults([])
                } else {
                    try {
                        const {data: {tracks: {items}}} = await axios.get(`https://api.spotify.com/v1/search?${
                            querystring.stringify({
                                q: newSong,
                                type: "track,artist",
                                limit: 5,
                                market: "NL"
                            })}`, {
                            headers: {
                                "Authorization": `Bearer ${spotifyData.token}`,
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            json: true
                        })
                        toggleError({
                            ...error,
                            searchError: false
                        })
                        setSearchResults(items)
                    } catch (e) {
                        toggleError({
                            ...error,
                            searchError: true
                        })
                        console.error(e.response.data.error)
                    }
                }
            }
            searchQuery()
        }
    }, [newSong])

    function pushToSpotifyArray(trackName, artistName, trackUri) {
        updateSongsArray((songsArray) => [...songsArray, {
            track: trackName,
            artist: artistName,
            trackUri: trackUri,
        }])
        setNewSong('')
        setInvalidInput(false)
    }

    function pushToSongsArray(e) {
        e.preventDefault()
        if (newSong) {
            if (newSong.indexOf(' ') === 0) {
                setInvalidInput(true)
            } else {
                updateSongsArray((songsArray) => [...songsArray, newSong])
                setNewSong('')
                setInvalidInput(false)
            }
        }
    }

    function close(){
        updateSongsArray([])
        setNewSong('')
        toggleCreateSetlist(false)
        setUseSpotify()
    }

    function deleteButtonHandler(index) {
        updateSongsArray([
            ...songsArray.slice(0, index),
            ...songsArray.slice(index + 1)])
    }

    function finishButton(){
        if (setlists.length === 0) {
            updateSetlists([{
                setlistName: nameOfSetlist,
                setlistArray: songsArray,
                useSpotify: useSpotify
            }])
        } else {
            updateSetlists([...setlists,
                {setlistName: nameOfSetlist,
                    setlistArray: songsArray,
                    useSpotify: useSpotify
                }])
        }
        toggleFinish(true)
    }

    useEffect(() =>{
        async function updateUserInfo() {
            if (finish) {
                const jsonStringSetlists = JSON.stringify(setlists)
                try {
                    const {data} = await axios.put('https://frontend-educational-backend.herokuapp.com/api/user',
                        {
                            info: jsonStringSetlists
                        }, {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`,
                            }
                        })
                    console.log(data)
                    setAuthState({
                        ...authState,
                        user: {
                            username: data.username,
                            mail: data.email,
                            id: data.id,
                            info: JSON.parse(data.info)
                        },
                        authStatus: 'done',
                        isAuth: true
                    })
                    toggleFinish(false)
                    close()
                } catch (e) {
                    console.error(e)
                }
            }
        }updateUserInfo()
    },[finish])

    return(
        <div className="setlist-creator">
            <header className="setlist-creator--header">
                <input
                    className="setlist-creator--title-input"
                    type="text"
                    id="setlist-name"
                    placeholder="Give me a name"
                    value={nameOfSetlist}
                    onChange={e => setNameOfSetlist(e.target.value)}
                />
                <Button
                    onClick={close}
                    type="button"
                    className="setlist-creator--close"
                    buttonText="X"
                />
            </header>
            <main className="setlist-creator--main">
                    <form
                        className="setlist-creator--form"
                        onSubmit={pushToSongsArray}
                    >
                        <div className="setlist-creator--search-result-div">
                            {useSpotify ?
                            <input
                                className="setlist-creator--search-input"
                                type="text"
                                value={newSong}
                                onChange={e => setNewSong(e.target.value)}
                            />
                            :
                            <div className="setlist-creator--div">
                                <Button
                                    className="setlist-creator--add-button"
                                    buttonText="Add"
                                />
                                <input
                                    className="setlist-creator--input"
                                    type="text"
                                    value={newSong}
                                    onChange={e => setNewSong(e.target.value)}
                                />
                            </div>
                            }
                            {useSpotify &&
                            <div>
                                <ul
                                    className="setlist-creator--ul"
                                >
                                    {newSong.length >= 1 &&
                                        React.Children.toArray(
                                        searchResults.map((result) => {
                                        return <li
                                            className="setlist-creator--li"
                                            onClick={() =>
                                                pushToSpotifyArray(result.name, result.artists[0].name, result.uri)}
                                        >
                                            <img src={result.album.images[0].url}
                                                 alt="album image"
                                                 className="setlist-creator--img"
                                            />
                                            <div>
                                                <p className="setlist-creator--result-track">
                                                    {result.name}
                                                </p>
                                                <p className="setlist-creator--result-artist">
                                                    {result.artists[0].name}
                                                </p>
                                            </div>
                                        </li>
                                    })
                                        )}
                                </ul>
                            </div>
                            }
                        </div>
                    </form>
                    <div className="setlist-creator--right-column">
                    { songsArray.length === 0 ?
                        <DisabledButton
                            buttonText="Clear all"
                            className="setlist-creator--clear-setlist__disabled"
                        />
                        :
                        <Button
                            type="button"
                            onClick={() => updateSongsArray([])}
                            buttonText="Clear all"
                            className="setlist-creator--clear-setlist"
                        />
                    }
                        <ol className ="setlist-creator--ol">
                            {invalidInput &&
                                <>
                                    <p
                                        className="setlist-creator--invalid-entry"
                                    >
                                        Input can't start with a space
                                    </p>
                                    <br/>
                                </>
                            }
                            {(songsArray.length >= 1) &&
                                songsArray.map((songArray, index) => {
                                    if (useSpotify) {
                                        return <li
                                            className="setlist-creator--li"
                                            key={songArray.trackUri}
                                        >
                                            {index + 1}. {songArray.track} - {songArray.artist}
                                            <div
                                                className="setlist-creator--button-div"
                                            >
                                                {spotifyData.playSong === true && spotifyData.deviceID ?
                                                    <Button
                                                        className="setlist-creator--play-pause-button"
                                                        buttonText={<img src={pauseButton} alt="play pause button"/>}
                                                        onClick={() => playPause(songArray.trackUri)}
                                                    />
                                                    :
                                                    <Button
                                                        className="setlist-creator--play-pause-button"
                                                        buttonText={<img src={playButton} alt="play pause button"/>}
                                                        onClick={() => playPause(songArray.trackUri)}
                                                    />
                                                }
                                                <Button
                                                    className="setlist-creator--delete-button"
                                                    type="button"
                                                    onClick={() => {
                                                        deleteButtonHandler(index)
                                                    }}
                                                    buttonText="X"
                                                />
                                            </div>
                                        </li>
                                    } else {
                                        return <li
                                            className="setlist-creator--li"
                                        >
                                            {index + 1}. {songArray}
                                            <Button
                                                className="setlist-creator--delete-button"
                                                type="button"
                                                onClick={() => {
                                                    deleteButtonHandler(index)
                                                }}
                                                buttonText="X"
                                            />
                                        </li>
                                    }
                                })
                            }
                        </ol>
                    </div>
            </main>
            <ErrorMessage
                playError={error.playError}
                deviceError={error.deviceError}
                userError={error.userError}
                spotifyAuthError={error.spotifyAuthError}
                spotifyRefreshError={error.spotifyRefreshError}
                searchError={error.searchError}
            />
            <footer className="setlist-creator--footer">
                {songsArray.length === 0 || nameOfSetlist.length === 0 ?
                    <DisabledButton
                        buttonText="Finish"
                        className="setlist-creator--finish-button__disabled"
                    />
                    :
                    <Button
                        type="button"
                        className="setlist-creator--finish-button"
                        buttonText="Finish"
                        onClick={finishButton}
                    />
                }
            </footer>
        </div>
    )
}

export default CreateSetlist