import React from 'react'
import './Login.scss'
import Background from "../../components/Background/Background";

function Login(){
    return (
        <Background
            top={
                <>
                    <h1 className="setlist">Setlist</h1>
                    <h1 className="manager">Manager</h1>
                </>
            }
            center={
                <>
                    <h2>Login</h2>
                    <form action=""></form>
                </>}
        />
    )
}

export default Login