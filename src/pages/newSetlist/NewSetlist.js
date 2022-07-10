import React, {useState} from 'react'
import './NewSetlist.scss'
import Background from "../../components/Background/Background";
import {
    Button,
    DisabledButton,
    MySetlistsButton,
    NewSetlistButton,
    ProfileButton
} from "../../components/Button/Button";
import {useNavigate} from "react-router-dom";

function NewSetlist(){
    const navigate = useNavigate()
    const [nameOfSetlist, setNameOfSetlist] = useState(undefined)
    const [useSpotify, setUseSpotify] = useState(undefined)
    const [createSetlist, toggleCreateSetlist] = useState(undefined)
    const [songsArray, updateSongsArray] = useState([])
    const [newSong, setNewSong] = useState('')
    const [invalidInput, setInvalidInput] = useState(false)


    function handleSubmit(e){
        e.preventDefault()
        toggleCreateSetlist(true)
    }

    function close(){
            updateSongsArray([])
            setNewSong('')
            toggleCreateSetlist(undefined)
            setNameOfSetlist('')
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


    function deleteButtonHandler(index) {
        setInvalidInput(false)
        if (songsArray.length === 1 && index === 0) {
            updateSongsArray([])
        } else {
            updateSongsArray([...songsArray.slice(0, index), ...songsArray.slice(index + 1)])
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
                }}
            />
        }
        centerContent={
            <MySetlistsButton
                onClick={() => {
                    navigate("/my-setlists")
                }}
            />
        }
        bottomContent={
            <>
                {createSetlist ?
                    <div className="setlist-creator">
                        <header className="setlist-creator--header">
                        <h2>{nameOfSetlist}</h2>
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
                                    onSubmit={pushToSongsArray}
                                >
                                    <label htmlFor="setlist-song">
                                        Song name
                                    </label>
                                    <span className="setlist-creator--span">
                                    <input
                                        className="setlist-creator--input"
                                        type="text"
                                        id="setlist-song"
                                        value={newSong}
                                        onChange={e => setNewSong(e.target.value)}
                                    />
                                    <Button
                                        className="setlist-creator--add-button"
                                        buttonText="Add"
                                    />
                                </span>
                                    <Button
                                        type="button"
                                        onClick={() => updateSongsArray([])}
                                        buttonText="Clear all"
                                        className="setlist-creator--clear-setlist"
                                    />
                                </form>
                                <ol className ="setlist-creator--ol">
                            {invalidInput ?
                                <>
                                <p
                                className="setlist-creator--invalid-entry"
                                >
                                Input can't start with a space
                                </p>
                                <br/>
                                </>
                                :
                                null
                            }
                            {(songsArray.length >= 1) ?
                                songsArray.map((songArray, index) => {
                                return <li className="setlist-creator--li">
                            {index +1}. {songArray}
                                <Button
                                className="setlist-creator--delete-button"
                                type="button"
                                onClick={() => {deleteButtonHandler(index)}}
                                buttonText="X"
                                />
                                </li>
                            })
                                :
                                <p className="setlist-creator--empty-list-message">
                                Add a song
                                </p>
                            }

                                </ol>
                                </>
                        </main>
                        <footer className="setlist-creator--footer">
                            <Button
                                className="setlist-creator--finish-button"
                                buttonText="Finish"
                                onClick=""
                            />
                        </footer>
                    </div>
                    :
                    <div className="new-setlist">
                        <NewSetlistButton
                            onClick={() => {
                                navigate("/home")
                            }}
                        />
                        <form
                            className="new-setlist--form"
                            onSubmit={handleSubmit}
                        >
                            <label htmlFor="setlist-name">
                                Setlist Name:
                            </label>
                            <input
                                className="textInput"
                                type="text"
                                id="setlist-name"
                                value={nameOfSetlist}
                                onChange={e => setNameOfSetlist(e.target.value)}
                            />
                            <legend>
                                Do you want to use Spotify?
                            </legend>
                            <div className="new-setlist-radio">
                                <label htmlFor="useSpotify">
                                    <input
                                        type="radio"
                                        name="useSpotify"
                                        id="useSpotify"
                                        onClick={() => setUseSpotify("useSpotify")}
                                    />
                                    Yes
                                </label>
                                <label htmlFor="dontUseSpotify">
                                    <input
                                        type="radio"
                                        id="dontUseSpotify"
                                        name="useSpotify"
                                        onClick={() => setUseSpotify("dontUseSpotify")}
                                    />
                                    No
                                </label>
                            </div>
                            {nameOfSetlist && useSpotify ?
                                <Button
                                    className="new-setlist--submit"
                                    type="submit"
                                    buttonText="Create Setlist"
                                />
                                :
                                <DisabledButton
                                    className="new-setlist--disabled"
                                    type="submit"
                                    buttonText="Create Setlist"
                                />
                            }
                        </form>
                    </div>
                }
            </>
        }
    />
    )
}

export default NewSetlist