import React, {useState, useEffect} from 'react'
import './Login.scss'
import Background from "../../components/Background/Background";
import Button from "../../components/Button/Button";
import {useNavigate, Navigate} from "react-router";

function Login(){
    const navigate = useNavigate();
    const [clicked, setClicked] = useState(false)

    function handleSubmit(e){
        e.preventDefault();
        console.log("Ingelogd")
        if(clicked){
            console.log("geregistreerd")
        }

    }

    return (
        <Background
            top={
                <>
                    <h1 className="setlist">Setlist</h1>
                    <h1 className="manager">Manager</h1>
                < />
            }
            center={ clicked ?
                <>
                    <span>
                        <h2 className="register-form__h2">
                            Register
                        </h2>
                    </span>
                    <form
                        className="register-form"
                        onSubmit={handleSubmit}
                    >
                        <label
                            htmlFor="mailadres"
                            id="mailadres"
                        >
                            E-mailadres
                        </label>
                        <input
                            type="text"
                            id="mailadres"
                        />
                        <label
                            htmlFor="username"
                            id="username"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                        />
                        <label
                            htmlFor="password"
                            id="password"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                        />
                        <label
                            htmlFor="password-again"
                            id="password-again"
                        >
                            Password again
                        </label>
                        <input
                            type="password"
                            id="password-again"
                        />
                        <Button
                            type="submit"
                            className="register-form__button"
                        >
                            Finish
                        </Button>
                    </form>
                </>
                :

                <>
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
                                <span className="loginButton__span">Login</span>
                            </Button>
                    </form>
                < />
                    }

                    bottom={clicked ?
                    <>
                    <Button
                            type="button"
                            className="registerButton--cancel-register"
                            onClick={() => {
                                setClicked(false)
                            }}
                            >
                                <span>
                                        Cancel
                                </span>
                    </Button>
                        </>
                :
                        <>
                            <Button
                                type="button"
                                className="registerButton--start-register"
                                onClick={() => {
                                    setClicked(true)
                                }}
                            >
                                <span>
                                    Or Register
                                </span>
                            </Button>

                        < />
            }
                />
                )
            }
                export default Login