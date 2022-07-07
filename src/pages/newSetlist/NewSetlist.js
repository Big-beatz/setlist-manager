import React from 'react'
import './NewSetlist.scss'
import Background from "../../components/Background/Background";
import {Button, MySetlistsButton, NewSetlistButton, ProfileButton} from "../../components/Button/Button";
import {useNavigate} from "react-router-dom";

function NewSetlist(){
    const navigate = useNavigate()

    return(
        <Background
            classNameTop="background-top"
            classNameCenter="background-center"
            classNameBottom="background-bottom__large"
            topContent={
                <ProfileButton
                    onClick={() => {navigate("/profile")}}
                />
            }
            centerContent={
                <MySetlistsButton
                    onClick={() => {navigate("/my-setlists")}}
                />
            }
            bottomContent={
                <div className="new-setlist">
                <NewSetlistButton
                    onClick={() => {navigate("/home")}}
                />
                    <form action="" className="new-setlist--form">
                        <label htmlFor="setlist-name">
                            Setlist Name:
                        </label>
                        <input
                            className="textInput"
                            type="text"
                            id="setlist-name"
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
                                />
                                Yes
                            </label>
                            <label htmlFor="dontUseSpotify">
                                <input
                                    type="radio"
                                    id="dontUseSpotify"
                                    name="useSpotify"
                                />
                                No
                            </label>
                        </div>
                        <Button
                            className="new-setlist--submit"
                            type="submit"
                            buttonText="Create Playlist"
                        />



                    </form>
                </div>
            }
        />
    )
}

export default NewSetlist