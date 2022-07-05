import React from 'react'
import './Navbar.scss'
import logoutIcon from '../../assets/icons/—Pngtree—vector logout icon_4184683.png'
import {Button} from "../Button/Button";
import {useNavigate} from "react-router-dom";

function Navbar(){
    const navigate = useNavigate()

    return(
        <div className="navbar">
            <Button
            type="button"
            className="logout-button"
            onClick={() => {navigate('/login')}}
            >
            <img src={logoutIcon} alt="Logout" className="logout-icon"/>
            </Button>
        </div>
    )
}

export default Navbar