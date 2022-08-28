import React, {useContext} from 'react'
import {Button} from "../Button/Button";
import {UserContext} from "../../context/UserContext";
import "./OpenSetlist.scss"
import pauseButton from "../../assets/icons/61039.png";
import playButton from "../../assets/icons/play-button-icon-png-18917.jpg";

function OpenSetlist({index, toggleOpenSetlist}){
    const {setlists, playSong, trackUri, setTrackUri, playPause} = useContext(UserContext)

    console.log(setlists)

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
                    return <li
                        className="open-setlist--li"
                    >
                        {index + 1}. {songArray.track} - {songArray.artist}
                        {playSong === true ?
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
                })
                }
              </ol>
          </main>
          <footer className="open-setlist--footer">
              <div>
                  <Button
                    className="open-setlist--pdf-button"
                    buttonText=".pdf"
                  />
              </div>
              <div>
                  <Button
                    className="open-setlist--playlist-button"
                    buttonText="Create playlist"
                  />
              </div>
          </footer>
        </div>
    )
}

export default OpenSetlist