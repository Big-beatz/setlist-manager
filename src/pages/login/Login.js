import React from 'react'
import './Login.scss'
import Background from "../../components/Background/Background";
import Button from "../../components/Button/Button";

function Login(){
    return (
        <Background
            top={
                <>
                    <h1 className="setlist">Setlist</h1>
                    <h1 className="manager">Manager</h1>
                < />
            }
            center={
                <>
                    <h2 className="login" >
                        Login
                    </h2>
                    <form
                        action=""
                        className="loginForm"
                    >
                            <label htmlFor="" id="username">
                                Username
                            </label>
                            <input
                                type="text"
                            />
                            <label
                                htmlFor="" id="password"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                            />
                    </form>
                < />
                    }
            bottom={
                <>
                    <Button
                    className="registerButton"
                    onClick={console.log("geklikt")}
                    >
                        Or Register
                    </Button>
                < />
            }
        />
    )
}

export default Login