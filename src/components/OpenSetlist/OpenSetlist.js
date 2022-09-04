import React, {useContext, useEffect, useState} from 'react'
import {Button, DisabledButton} from '../Button/Button'
import {UserContext} from '../../context/UserContext/UserContext'
import './OpenSetlist.scss'
import pauseButton from '../../assets/icons/61039.png'
import playButton from '../../assets/icons/play-button-icon-png-18917.jpg'
import axios from 'axios'
import ErrorMessage from '../ErrorMessage/ErrorMessage'


function OpenSetlist({index, toggleOpenSetlist}){
    const {
        setlists,
        spotifyData,
        error,
        toggleError,
        playPause
    } = useContext(UserContext)
    const [createSpotifyPlaylist, toggleCreateSpotifyPlaylist] = useState(false)
    const [playlistID, setPlaylistID] = useState('')
    const [loading, toggleLoading] = useState(false)
    const [success, toggleSuccess] = useState(false)

    useEffect(() => {
    async function createPlaylist(){
        if (createSpotifyPlaylist) {
            toggleLoading(true)
        try{
            const {data} = await axios.post(`https://api.spotify.com/v1/users/${spotifyData.userID}/playlists?`,
                {
                name: setlists[index].setlistName,
                description: 'Setlist Manager created playlist',
                public: false
            },{
                headers:{
                    'Authorization': `Bearer ${spotifyData.token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                json: true
            } )
            setPlaylistID(data.id)
            toggleError({
                ...error,
                createPlaylistError: false
            })
        } catch(e){
            toggleError({
                ...error,
                createPlaylistError: true
            })
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
                                'Authorization': `Bearer ${spotifyData.token}`,
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            json: true}
                            )
                    if (data.status === 201){
                        toggleLoading(false)
                        toggleSuccess(true)
                    }
                    toggleError({
                        ...error,
                        createPlaylistError: false
                    })
                } catch(e){
                    toggleError({
                        ...error,
                        createPlaylistError: true
                    })
                }
            }} addSongsToPlaylist()
    }, [playlistID])


    return(
        <div className='open-setlist--div'>
          <header className='open-setlist--header'>
            <h1>
                {setlists[index].setlistName}
            </h1>
            <Button
                className='open-setlist--close-button'
                buttonText='X'
                onClick={() => toggleOpenSetlist({open: false, index: null})}
            />
          </header>
          <main className='open-setlist--main'>
              <ol className="open-setlist--ol">
                {React.Children.toArray(
                    setlists[index].setlistArray.map((songArray, index) => {
                    if(songArray.track){
                        return <li
                            className='open-setlist--li'
                        >
                            {index + 1}. {songArray.track} - {songArray.artist}
                            {spotifyData.playSong && !loading && spotifyData.deviceID ?
                                <Button
                                    className='setlist-creator--play-pause-button'
                                    buttonText={<img src={pauseButton} alt='play pause button'/>}
                                    onClick={() => playPause(songArray.trackUri)}
                                />
                                :
                                <Button
                                    className='setlist-creator--play-pause-button'
                                    buttonText={<img src={playButton} alt='play pause button'/>}
                                    onClick={() => playPause(songArray.trackUri)}
                                />
                            }
                        </li>
                    } else {
                        return <li
                            className='open-setlist--li'
                            key={index}
                        >
                            {index + 1}. {songArray}
                        </li>
                    }
                })
                )}
              </ol>
              {success &&
              <>
                  <p className='open-setlist--p__success-playlist'>
                      A playlist named "{setlists[index].setlistName}" has been created.
                  </p>
              </>
              }
              {setlists[index].useSpotify &&
              < ErrorMessage
                  playError={error.playError}
                  createPlaylistError={error.createPlaylistError}
                  deviceError={error.deviceError}
                  userError={error.userError}
                  spotifyAuthError={error.spotifyAuthError}
                  spotifyRefreshError={error.spotifyRefreshError}
                  />
              }
          </main>
          <footer className='open-setlist--footer'>
              {loading ?
                  <>
                      <DisabledButton
                          className='open-setlist--playlist-button-disabled'
                          buttonText='Create playlist'
                      />
                  </>
                  : success ?
                  <>
                      <DisabledButton
                          className='open-setlist--playlist-button-disabled'
                          buttonText='Create playlist'
                      />
                  </>
                  : setlists[index].useSpotify && !error.userError ?
                  <>
                      <Button
                          className='open-setlist--playlist-button'
                          buttonText='Create playlist'
                          onClick={() => toggleCreateSpotifyPlaylist(true)}
                      />
                  </>
                  :
                  <div  className='footer-logo'>
                  <h1>Setlist</h1>
                  <h1>Manager</h1>
                  </div>
              }
          </footer>
        </div>
    )
}

export default OpenSetlist