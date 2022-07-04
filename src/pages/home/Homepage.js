import './Homepage.scss'
import Background from "../../components/Background/Background";
import {Button, ProfileButton, MySetlistsButton, NewSetlistButton} from "../../components/Button/Button";
import React, {useState} from 'react'


function Homepage(){

    return(
        <Background
        top={
            <ProfileButton />
        }
        center={
            <MySetlistsButton />
        }
        bottom={
            <NewSetlistButton />
        }
        />
    )
}

export default Homepage