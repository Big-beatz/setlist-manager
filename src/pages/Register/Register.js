import React, {useEffect, useState} from 'react'
import {Button, DisabledButton} from "../../components/Button/Button";
import {useNavigate} from "react-router-dom";
import Background from "../../components/Background/Background";
import './Register.scss'
import axios from 'axios'
import RegisterStatus from "../../components/RegisterStatus/RegisterStatus";

function Register(){
    const navigate = useNavigate();
    const [loading, toggleLoading] = useState(false)
    const [error, toggleError] = useState(false)
    const [validInput, setValidInput] = useState(false)
    const [registerStatus, setRegisterStatus] = useState(false)
    const [userRegistration, setUserRegistration] = useState({
        mailadres: '',
        username: '',
        password: '',
        passwordAgain: ''
    })


    useEffect(() =>{
        if(userRegistration.mailadres.includes("@") &&
            userRegistration.username.length >= 6 &&
            userRegistration.password.length >= 6 &&
            userRegistration.passwordAgain === userRegistration.password){
            setValidInput(true)
        } else{
            setValidInput(false)
        }
    }, [handleChange])

    function handleChange(e){
        setUserRegistration({
            ...userRegistration,
            [e.target.name]: e.target.value
        })
    }

    async function reguestRegistration() {
        try {
            const data = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
                "username": userRegistration.username,
                "email": userRegistration.mailadres,
                "password": userRegistration.password,
                "role": ["user"]
            })
            toggleLoading(true)
            if (data.status === 200){
                setRegisterStatus(true)
            }
        } catch (e) {
            toggleError(true)
            console.error(e)
        }
        toggleLoading(false)
    }

    function handleRegister(e) {
        e.preventDefault()
        reguestRegistration()
    }

    function clearRegistration(){
        setUserRegistration({...userRegistration, username: '', passwordAgain: '', mailadres: '', password: ''})
        toggleError(false)
    }

    function toLogin(){
        setRegisterStatus(false)
        navigate('/login')
    }

    return(
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
                <div className="registerContainer">
                    {registerStatus || error ?
                    <RegisterStatus
                        error={error}
                        registerStatus={registerStatus}
                        userName={userRegistration.username}
                        clearRegistration={clearRegistration}
                        toLogin={toLogin}
                    />
                    :
                        <>
                        <span>
                            <h2 className="register-form__h2">
                                Register
                            </h2>
                        </span>
                    <form
                        className="register-form"
                        onSubmit={handleRegister}
                    >
                        <label
                            htmlFor="mailadres"
                            id="mailadres"
                        >
                            E-mailadres
                                <p className="register-form--requirement">
                                    Mailadres requires a '@' token.
                                </p>
                        </label>
                        <input
                            className="textInput"
                            type="text"
                            id="mailadres"
                            name="mailadres"
                            value={userRegistration.mailadres}
                            onChange={handleChange}
                        />
                        <label
                            htmlFor="username"
                            id="username"
                        >
                            Username
                            <p className="register-form--requirement">
                                *Username must be at least 6 tokens.
                            </p>

                        </label>
                        <input
                            className="textInput"
                            type="text"
                            id="username"
                            name="username"
                            value={userRegistration.username}
                            onChange={handleChange}
                        />
                        <label
                            htmlFor="password"
                            id="password"
                        >
                            Password
                            <p className="register-form--requirement">
                                *Password must be at least 6 tokens.
                            </p>
                        </label>
                        <input
                            className="textInput"
                            type="password"
                            id="password"
                            name="password"
                            value={userRegistration.password}
                            onChange={handleChange}
                        />
                        <label
                            htmlFor="password-again"
                            id="password-again"
                        >
                            Password again
                        </label>
                        <input
                            className="textInput"
                            type="password"
                            name="passwordAgain"
                            id="password-again"
                            value={userRegistration.passwordAgain}
                            onChange={handleChange}
                        />
                        {loading && <p>...Loading</p>}
                        { validInput ?
                            <Button
                                type="submit"
                                className="register-form--button"
                                buttonText="Finish"
                            />
                            :
                            <DisabledButton
                                className="register-form--button__disabled"
                                buttonText="Finish"
                            />
                        }

                        </form>
                        </>
                    }
                </div>
            </>
            }
            bottomContent={
            <>
                {(!registerStatus && !error) &&
                    <Button
                        type="button"
                        className="registerButton--cancel-register"
                        onClick={() => {
                        navigate("/login")
                        }}
                        buttonText="Cancel"
                    />
                }
            </>
            }
        />
    )
}

export default Register