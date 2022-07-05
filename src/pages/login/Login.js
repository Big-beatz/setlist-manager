import React, {useState, useEffect} from 'react'
import './Login.scss'
import Background from "../../components/Background/Background";
import {Button} from "../../components/Button/Button";
import {useNavigate, Navigate} from "react-router";

function Login(){
    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();
        console.log("Ingelogd")
        navigate("/home")

    }

    return (
        <Background
            classNameTop="background-top"
            classNameCenter="background-center"
            classNameBottom="background-bottom"
            topContent={
                <>
                    <h1 className="setlist">Setlist</h1>
                    <h1 className="manager">Manager</h1>
                < />
            }
            centerContent={
                <>
                    <div className="loginContainer">
                        <span className="login">
                            <h2 className="login__h2">
                                Login
                            </h2>
                        </span>
                        <form
                            action=""
                            className="loginForm"
                            onSubmit={handleSubmit}
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
                                <Button
                                type="submit"
                                className="loginForm__button"
                                >
                                    <span className="loginButton__span">
                                        Login
                                    </span>
                                </Button>
                        </form>
                    </div>
                </>
                    }
                    bottomContent={
                    <>
                        <Button
                            type="button"
                            className="registerButton--start-register"
                            onClick={() => {
                                navigate("/register")
                            }}
                        >
                                <span>
                                    Or Register
                                </span>
                        </Button>
                    </>
                }
                    />
            )
}

export default Login