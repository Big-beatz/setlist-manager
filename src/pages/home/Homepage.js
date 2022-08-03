import './Homepage.scss'
import Background from "../../components/Background/Background";
import {ProfileButton, MySetlistsButton, NewSetlistButton} from "../../components/Button/Button";
import React, {useContext, useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import checkAuthorization from "../../components/Helpers/CheckAuthorization";


function Homepage(){
    const {authState} = useContext(AuthContext)
    const navigate = useNavigate()
    const reloadCount = sessionStorage.getItem('reloadCount')

    useEffect(() => {
        if(reloadCount < 1) {
            sessionStorage.setItem('reloadCount', String(reloadCount + 1));
            window.location.reload();
        }
        setTimeout(() =>
        {checkAuthorization()}, 500)
    }, []);

    function checkAuthorization(){
        if(authState.isAuth === false){
            navigate('/login')
        }
    }



    return(
    <Background
        classNameTop="background-top"
        classNameCenter="background-center"
        classNameBottom="background-bottom"
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
            <NewSetlistButton
                onClick={() => {
                    navigate("/new-setlist")
                }}

            />
        }
    />
    )
}

export default Homepage