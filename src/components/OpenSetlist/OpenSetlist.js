import React, {useContext, useEffect, useState} from 'react'
import {Button, DisabledButton} from "../Button/Button";
import {UserContext} from "../../context/UserContext";
import "./OpenSetlist.scss"
import pauseButton from "../../assets/icons/61039.png";
import playButton from "../../assets/icons/play-button-icon-png-18917.jpg";
import axios from "axios";


function OpenSetlist({index, toggleOpenSetlist}){
    const {
        setlists,
        playSong,
        trackUri,
        setTrackUri,
        playPause,
        userID,
        spotifyToken
    } = useContext(UserContext)
    const [createSpotifyPlaylist, toggleCreateSpotifyPlaylist] = useState(false)
    const [playlistID, setPlaylistID] = useState('')
    const [loading, toggleLoading] = useState(false)
    const [success, toggleSuccess] = useState(false)

    console.log(setlists)

    useEffect(() => {
    async function createPlaylist(){
        if (createSpotifyPlaylist) {
            toggleLoading(true)
        try{
            const {data} = await axios.post(`https://api.spotify.com/v1/users/${userID}/playlists?`,
                {
                name: setlists[index].setlistName,
                description: "Setlist Manager created playlist",
                public: false
            },{
                headers:{
                    "Authorization": `Bearer ${spotifyToken.token}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                    },
                json: true
            } )
            setPlaylistID(data.id)
            console.log(data.id)
        } catch(e){
            console.error(e.response.data.error)
        }
    }}
        createPlaylist()
    }, [createSpotifyPlaylist])



    useEffect(() => {
        const lastSongIndex = setlists[index].setlistArray.length - 1
        let playlistUris = ''
        setlists[index].setlistArray.map((uris, index) =>{
            if(index === lastSongIndex){
                return playlistUris += `${uris.trackUri}`
            } else {
                return playlistUris += `${uris.trackUri},`
            }
        })
        async function addSongsToPlaylist(){
            if(createSpotifyPlaylist){
                toggleCreateSpotifyPlaylist(false)
                try{
                    const data = await axios.post(`https://api.spotify.com/v1/playlists/${playlistID}/tracks?uris=${playlistUris}`,
                        {},
                        {headers: {
                                "Authorization": `Bearer ${spotifyToken.token}`,
                                "Accept": "application/json",
                                "Content-Type": "application/json"
                            },
                            json: true}
                            )
                    console.log(data.status)
                    if (data.status === 201){
                        toggleLoading(false)
                        toggleSuccess(true)
                    }
                } catch(e){
                    console.error(e.response.data.error)
                }
            }} addSongsToPlaylist()
    }, [playlistID])


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
        <div className="open-setlist--div">
          <header className="open-setlist--header">
            <h1>
                {setlists[index].setlistName}
            </h1>
            <Button
                className="open-setlist--close-button"
                buttonText="X"
                onClick={() => toggleOpenSetlist({open: false, index: null})}
            />
          </header>
          <main className="open-setlist--main">
              <ol className="open-setlist--ol">
                {setlists[index].setlistArray.map((songArray, index) => {
                    if(songArray.track){
                        return <li
                            key={index}
                            className="open-setlist--li"
                        >
                            {index + 1}. {songArray.track} - {songArray.artist}
                            {playSong && !loading ?
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
                        </li>
                    } else {
                        return <li
                            className="open-setlist--li"
                            key={index}
                        >
                            {index + 1}. {songArray}
                        </li>
                    }
                })
                }
              </ol>
              {success &&
              <p className="open-setlist--p">
                  A playlist named "{setlists[index].setlistName}" has been created
              </p>
              }
          </main>
          <footer className="open-setlist--footer">
              {loading ?
                  <>
                      <DisabledButton
                          className="open-setlist--pdf-button-disabled"
                          buttonText=".pdf"
                      />
                      <DisabledButton
                          className="open-setlist--playlist-button-disabled"
                          buttonText="Create playlist"
                      />
                  </>
                  : success ?
                  <>
                  <Button
                      className="open-setlist--pdf-button"
                      buttonText=".pdf"
                  />
                      <DisabledButton
                          className="open-setlist--playlist-button-disabled"
                          buttonText="Create playlist"
                      />
                  </>
                  : setlists[index].useSpotify ?
                  <>
                      <Button
                          className="open-setlist--pdf-button"
                          buttonText=".pdf"
                      />
                      <Button
                          className="open-setlist--playlist-button"
                          buttonText="Create playlist"
                          onClick={() => toggleCreateSpotifyPlaylist(true)}
                      />
                  </>
                  :
                      <Button
                          className="open-setlist--pdf-button"
                          buttonText=".pdf"
                      />
              }
          </footer>
        </div>
    )
}

export default OpenSetlist