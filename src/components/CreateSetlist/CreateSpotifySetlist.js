import React, {useContext, useEffect, useState} from 'react'
import './CreateSetlist.scss'
import {Button, DisabledButton} from "../Button/Button";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../../context/UserContext";
import axios from "axios";
import querystring from "querystring-es3";
import playPauseIcon from '../../assets/icons/kisspng-button-download-icon-pause-button-png-file-5a757e559fc778.1273614115176494936545.png'
import playButton from '../../assets/icons/play-button-icon-png-18917.jpg'
import pauseButton from '../../assets/icons/61039.png'

function CreateSpotifySetlist(){
    const navigate = useNavigate()
    const {
        addSetlist,
        spotifyToken,
        playPause,
        playSong,
        toggleCreateSetlist,
        trackUri,
        setTrackUri,
        useSpotify,
        setUseSpotify,
        deviceID
    } = useContext(UserContext)
    const [nameOfSetlist, setNameOfSetlist] = useState('')
    const [songsArray, updateSongsArray] = useState([])
    const [newSong, setNewSong] = useState('')
    const [invalidInput, setInvalidInput] = useState(false)
    const [searchResults, setSearchResults] = useState([])

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

    useEffect(() => {
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
                            "Authorization": `Bearer ${spotifyToken.token}`,
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        json: true
                    })
                    console.log(spotifyToken.token)
                    return setSearchResults(items)
                } catch (e) {
                    console.error(e.response.data.error)
                }
            }
        } searchQuery()
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

    function finishButton(){
        addSetlist(nameOfSetlist, songsArray, useSpotify)
        close()
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

    function handlePlay(sendTrackUri){
        if (trackUri){
            setTrackUri('')
            setTrackUri(sendTrackUri)
            playPause()
        }
        else {
            setTrackUri(sendTrackUri)
            playPause()
        }
    }

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
                <>
                    <form
                        className="setlist-creator--form"
                        onSubmit={e => e.preventDefault}
                    >
                        <div className="setlist-creator--search-result-div">
                            <div className="setlist-creator--div">
                                {useSpotify ?
                                    <DisabledButton
                                        className="setlist-creator--add-button"
                                        buttonText="Add"
                                    />
                                    :
                                    <Button
                                        className="setlist-creator--add-button"
                                        buttonText="Add"
                                    />
                                }
                                <input
                                    className="setlist-creator--search-input"
                                    type="text"
                                    id="setlist-song"
                                    value={newSong}
                                    onChange={e => setNewSong(e.target.value)}
                                />
                            </div>
                            <div>
                                <ul
                                    className="setlist-creator--ul"
                                >
                                {newSong.length >= 1 &&
                                searchResults.map((result, index) => {
                                    return <li
                                        className="setlist-creator--li"
                                        key={index}
                                        onClick={() => pushToSpotifyArray(result.name, result.artists[0].name, result.uri)}
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
                                }
                                </ul>
                            </div>
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
                                    return <li
                                        className="setlist-creator--li"
                                        key={songArray.trackUri}
                                            >
                                        {index +1}. {songArray.track} - {songArray.artist}
                                        <div
                                        className="setlist-creator--button-div"
                                        >
                                        {playSong === true && deviceID ?
                                            <Button
                                                className="setlist-creator--play-pause-button"
                                                buttonText={<img src={pauseButton} alt="play pause button"/>}
                                                onClick={() => handlePlay(songArray.trackUri)}
                                            />
                                            :
                                            <Button
                                                className="setlist-creator--play-pause-button"
                                                buttonText={<img src={playButton} alt="play pause button"/>}
                                                onClick={() => handlePlay(songArray.trackUri)}
                                            />
                                        }
                                        <Button
                                            className="setlist-creator--delete-button"
                                            type="button"
                                            onClick={() => {deleteButtonHandler(index)}}
                                            buttonText="X"
                                        />
                                        </div>
                                    </li>
                                })
                            }
                        </ol>
                    </div>
                </>
            </main>
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

export default CreateSpotifySetlist