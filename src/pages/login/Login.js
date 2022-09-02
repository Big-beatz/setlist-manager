import React, {useState, useEffect, useContext} from 'react'
import './Login.scss'
import Background from "../../components/Background/Background";
import Input from "../../components/Input/Input"
import {Button} from "../../components/Button/Button";
import {useNavigate} from "react-router-dom";
import axios from 'axios'
import {AuthContext} from "../../context/AuthContext/AuthContext";
import {UserContext} from "../../context/UserContext/UserContext";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

function Login(){
    const {setAuthState, authState} = useContext(AuthContext)
    const {error, toggleError} = useContext(UserContext)
    const navigate = useNavigate();
    const [startup, toggleStartup] = useState(true)
    const [userLogin, setUserLogin] = useState({
        username: "",
        password: ""
    })

useEffect(() => {
        if(startup) {
            setTimeout(() => {
            toggleStartup(false)
        }, 1900)
        }
    async function contactBackend(){
        try{
            const data = await axios.get( 'https://frontend-educational-backend.herokuapp.com/api/test/all')
        }
        catch(e){
            console.error(e)
        }
    }
        contactBackend()
        if(authState.isAuth === true) {
            localStorage.clear()
            setAuthState({
                ...authState,
                user: null,
                authStatus: 'done',
                isAuth: false
            })
        }
        sessionStorage.clear()
    }, [])

    async function handleLogin(){
        try{
            const {data} = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin', {
                "username": userLogin.username,
                "password": userLogin.password
            })
            toggleError({
                ...error,
                loginError: false
            })
            localStorage.setItem('token', data.accessToken)
            setTimeout(() => {
            navigate('/home')}, 500)
        }
        catch(e){
            console.error(e)
            toggleError({
                ...error,
                loginError: true
            })
        }
    }

    function handleChange(e){
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        handleLogin()
    }

    return (
        <>
        { startup ?
                <Background
                    classNameTop="background-top"
                    classNameCenter="background-center"
                    classNameBottom="background-bottom"
                    centerContent={
                        <div className="startup-logo--h1">
                            <h1>Setlist</h1>
                            <h1>Manager</h1>
                        </div>
                    }
                />
            :
                <>
                <Background
                    classNameTop="background-top"
                    classNameCenter="background-center"
                    classNameBottom="background-bottom"
                    topContent={
                            <header className="login--header">
                                <h1 className="setlist">Setlist</h1>
                                <h1 className="manager">Manager</h1>
                            </header>
                    }
                    centerContent={
                        <div className="loginContainer">
                            <span className="login">
                                <h2 className="login__h2">
                                    Login
                                </h2>
                            </span>
                            <form
                                className="loginForm"
                                onSubmit={handleSubmit}
                            >
                                <Input
                                    label="Username"
                                    className="textInput"
                                    inputType="text"
                                    inputName="username"
                                    onChange={handleChange}
                                />
                                <Input
                                    label="Password"
                                    className="textInput"
                                    inputType="password"
                                    inputName="password"
                                    onChange={handleChange}
                                />
                                <ErrorMessage
                                    loginError={error.loginError}
                                />
                                <Button
                                    type="submit"
                                    className="loginForm__button"
                                    buttonText="Login"
                                />
                            </form>
                        </div>
                    }
                    bottomContent={
                        <footer className="login--footer">
                            <Button
                                type="button"
                                className="registerButton--start-register"
                                onClick={() => {
                                    navigate("/register")
                                }}
                                buttonText="Or Register"
                            />
                        </footer>
                    }
                />
            </>
        }
    </>
    )
}

export default Login