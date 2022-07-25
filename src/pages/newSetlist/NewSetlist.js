import React, {useContext, useState} from 'react'
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
import {UserContext} from "../../context/UserContext";
import CreateSetlist from "../../components/CreateSetlist/CreateSetlist";

function NewSetlist(){
    const navigate = useNavigate()
    const {setlists} = useContext(UserContext)

    const [nameOfSetlist, setNameOfSetlist] = useState('')
    const [useSpotify, setUseSpotify] = useState('')
    const [createSetlist, toggleCreateSetlist] = useState(false)



    function handleSubmit(e){
        e.preventDefault()
        toggleCreateSetlist(true)
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
                        <CreateSetlist
                        nameOfSetlist={nameOfSetlist}
                        useSpotify={useSpotify}
                        />
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
                                                onClick={() => setUseSpotify('useSpotify')}
                                            />
                                            Yes
                                        </label>
                                        <label htmlFor="dontUseSpotify">
                                            <input
                                                type="radio"
                                                id="dontUseSpotify"
                                                name="useSpotify"
                                                onClick={() => setUseSpotify('dontUseSpotify')}
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