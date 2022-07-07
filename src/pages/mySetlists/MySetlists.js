import React from 'react'
import './MySetlists.scss'
import Background from "../../components/Background/Background";
import {MySetlistsButton, NewSetlistButton, ProfileButton} from "../../components/Button/Button";
import {useNavigate} from "react-router-dom";

function MySetlists(){
    const navigate = useNavigate()

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
                <MySetlistsButton
                    onClick={() => {navigate("/home")}}
                />
                    <ol className="setlists">
                        <li>
                            <section className="setlists--section">
                                <h3>Setlist 1</h3>
                                <ol>
                                    <li>Song 1</li>
                                    <li>Song 2</li>
                                    <li>Song 3</li>
                                </ol>
                            </section>
                        </li>
                        <li>
                            <section className="setlists--section">
                                <h3>Setlist 1</h3>
                                <ol>
                                    <li>Song 1</li>
                                    <li>Song 2</li>
                                    <li>Song 3</li>
                                </ol>
                            </section>
                        </li>
                        <li>
                            <section className="setlists--section">
                                <h3>Setlist 1</h3>
                                <ol>
                                    <li>Song 1</li>
                                    <li>Song 2</li>
                                    <li>Song 3</li>
                                </ol>
                            </section>
                        </li>
                        <li>
                            <section className="setlists--section">
                                <h3>Setlist 1</h3>
                                <ol>
                                    <li>Song 1</li>
                                    <li>Song 2</li>
                                    <li>Song 3</li>
                                </ol>
                            </section>
                        </li>
                    </ol>
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