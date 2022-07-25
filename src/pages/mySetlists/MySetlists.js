import React, {useContext, useState} from 'react'
import './MySetlists.scss'
import Background from "../../components/Background/Background";
import {Button, MySetlistsButton, NewSetlistButton, ProfileButton} from "../../components/Button/Button";
import {Link, useNavigate} from "react-router-dom";
import {UserContext} from "../../context/UserContext";
import OpenSetlist from "../../components/OpenSetlist/OpenSetlist";

function MySetlists(){
    const navigate = useNavigate()
    const {setlists, updateSetlists} = useContext(UserContext)

    const[openSetlist, toggleOpenSetlist] = useState({
            open: false,
            index: null,
        })

    function deleteButtonHandler(index) {
        updateSetlists([...setlists.slice(0, index), ...setlists.slice(index + 1)])
    }

    return(
        <Background
            classNameTop="background-top"
            classNameCenter="background-center__large"
            classNameBottom="background-bottom"
            topContent={
                <ProfileButton
                    onClick={() => {navigate("/profile")}}
                />
            }
            centerContent={
                <>
                {openSetlist.open ?
                        <OpenSetlist
                            nameOfSetlist={openSetlist.nameOfSetlist}
                            index={openSetlist.index}
                            toggleOpenSetlist={toggleOpenSetlist}
                        />
                        :
                        <div className="my-setlists--content">
                            <header className="my-setlists--header">
                                <MySetlistsButton
                                    onClick={() => {
                                        navigate("/home")
                                    }}
                                />
                            </header>
                            <div className="my-setlists--div">
                                {setlists.length === 0 ?
                                    <section className="my-setlists--section">
                                        <p>There are no setlists yet. </p>
                                        <p>Go to New Setlist and make a setlist</p>
                                    </section>
                                    :
                                    <>
                                        {setlists.map((setlist, index) => {
                                            return (
                                                <section className="my-setlists--section">
                                        <span className="my-setlists--span">
                                            <h3 className="my-setlists--h3">
                                                <Button
                                                    onClick={() => toggleOpenSetlist({
                                                        open: true,
                                                        nameOfSetlist: setlist.setlistName,
                                                        index: index
                                                    })}
                                                    buttonText={setlist.setlistName}
                                                />
                                            </h3>
                                            <Button
                                                buttonText="X"
                                                className="my-setlists--close-button"
                                                onClick={() => deleteButtonHandler(index)}
                                            />
                                        </span>
                                                    <ol>
                                                        {setlist.setlistArray.slice(0, 3).map((arrayPreview) => {
                                                            return <li>{arrayPreview}</li>
                                                        })}
                                                    </ol>
                                                </section>
                                            )
                                        })}
                                    </>
                                }
                            </div>
                        </div>
                }
                </>
            }
            bottomContent={
                <NewSetlistButton
                    onClick={() => {navigate("/new-setlist")}}
                />
            }
        />
    )
}

export default MySetlists