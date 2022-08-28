import React, {useState, useEffect, useContext} from 'react'
import './Login.scss'
import Background from "../../components/Background/Background";
import Input from "../../components/Input/Input"
import {Button} from "../../components/Button/Button";
import {useNavigate, Navigate} from "react-router-dom";
import axios from 'axios'
import {AuthContext} from "../../context/AuthContext";

function Login(){
    const {setAuthState, authState} = useContext(AuthContext)
    const noviBackend = 'https://frontend-educational-backend.herokuapp.com/'
    const navigate = useNavigate();
    const [error, toggleError] = useState(false)
    const [userLogin, setUserLogin] = useState({
        username: "",
        password: ""
    })

    useEffect(() => {
    async function contactBackend(){
        try{
            const data = await axios.get( 'https://frontend-educational-backend.herokuapp.com/api/test/all')
            console.log(data)
        }
        catch(e){
            console.error(e)
        }
    }
        contactBackend()
        localStorage.clear()
        setAuthState({
            ...authState,
            user: null,
            authStatus: 'done',
            isAuth: false
        })
        sessionStorage.clear()
    }, [])



    async function handleLogin(){
        try{
            const {data} = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin', {
                "username": userLogin.username,
                "password": userLogin.password
            })
            toggleError(false)
            console.log(data)
            localStorage.setItem('token', data.accessToken)
            setTimeout(() => {
            navigate('/home')}, 500)
        }
        catch(e){
            console.error(e)
            toggleError(true)
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
        <Background
            classNameTop="background-top"
            classNameCenter="background-center"
            classNameBottom="background-bottom"
            topContent={
                <>
                    <header className="login--header">
                        <h1 className="setlist">Setlist</h1>
                        <h1 className="manager">Manager</h1>
                    </header>
                </>
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
                            {error &&
                            <p className="login-error-message">
                                *Username & password combination is incorrect, please try again or register first.
                            </p>}
                                <Button
                                type="submit"
                                className="loginForm__button"
                                buttonText="Login"
                                />
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
                            buttonText="Or Register"
                        />
                    </>
                }
                    />
            )
}

export default Login