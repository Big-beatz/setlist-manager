import React, {useContext, useState} from 'react'
import './CreateSetlist.scss'
import {Button, DisabledButton} from "../Button/Button";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../../context/UserContext";

function CreateSetlist({nameOfSetlist}){
    const navigate = useNavigate()
    const {addSetlist} = useContext(UserContext)

    const [songsArray, updateSongsArray] = useState([])
    const [newSong, setNewSong] = useState('')
    const [invalidInput, setInvalidInput] = useState(false)

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
        navigate('/home')
    }

    function finishButton(){
       addSetlist(nameOfSetlist, songsArray)
        close()
    }

    function deleteButtonHandler(index) {
        updateSongsArray([...songsArray.slice(0, index), ...songsArray.slice(index + 1)])
        }


    return(
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
                {songsArray.length === 0 ?
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