import React, {useContext, useEffect, useState} from 'react'
import {Button, DisabledButton} from "../../components/Button/Button";
import {useNavigate} from "react-router-dom";
import Background from "../../components/Background/Background";
import './Register.scss'
import axios from 'axios'
import RegisterStatus from "../../components/RegisterStatus/RegisterStatus";
import Input from "../../components/Input/Input";
import {UserContext} from "../../context/UserContext/UserContext";

function Register(){
    const {error, toggleError} = useContext(UserContext)
    const navigate = useNavigate();
    const [loading, toggleLoading] = useState(false)
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

    async function reguestRegistration() {
        try {
            toggleLoading(true)
            const data = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
                "username": userRegistration.username,
                "email": userRegistration.mailadres,
                "password": userRegistration.password,
                "role": ["user"]
            })
            if (data.status === 200){
                setRegisterStatus(true)
                toggleLoading(false)
            }
        } catch (e) {
            toggleError({
                ...error,
                registerError: true
            })
            toggleLoading(false)
            console.error(e)
        }
    }

    function handleChange(e){
        setUserRegistration({
            ...userRegistration,
            [e.target.name]: e.target.value})
    }

    function handleRegister(e) {
        e.preventDefault()
        reguestRegistration()
    }

    function cancelRegistration(){
        setUserRegistration({
            ...userRegistration,
            username: '',
            passwordAgain: '',
            mailadres: '',
            password: ''
        })
        toggleError(false)
    }

    return(
        <Background
            classNameTop="background-top"
            classNameCenter="background-center"
            classNameBottom="background-bottom"
            topContent={
                <header className="register--header">
                    <h1 className="setlist">
                        Setlist
                    </h1>
                    <h1 className="manager">
                        Manager
                    </h1>
                </header>
            }
            centerContent={
                <main className="register--main">
                    {registerStatus || error.registerError ?
                    <RegisterStatus
                        error={error.registerError}
                        registerStatus={registerStatus}
                        userName={userRegistration.username}
                        clearRegistration={cancelRegistration}
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
                            <Input
                                label="E-mailadres"
                                className="textInput"
                                inputType="text"
                                inputName="mailadres"
                                onChange={handleChange}
                                children={
                                    <p className="register-form--p">
                                        Mailadres requires a '@' token.
                                    </p>}
                            />
                            <Input
                                label="Username"
                                className="textInput"
                                inputType="text"
                                inputName="username"
                                onChange={handleChange}
                                children={
                                    <p className="register-form--p">
                                        *Username must be at least 6 tokens.
                                    </p>}
                            />
                            <Input
                                label="Password"
                                className="textInput"
                                inputType="password"
                                inputName="password"
                                onChange={handleChange}
                                children={
                                    <p className="register-form--p">
                                        *Password must be at least 6 tokens.
                                    </p>}
                            />
                            <Input
                                label="Password Again"
                                className="textInput"
                                inputType="password"
                                inputName="passwordAgain"
                                onChange={handleChange}
                            />
                            {loading &&
                            <p>...Loading</p>
                            }
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
                </main>
            }
            bottomContent={
                <footer className="register--footer">
                    {(!registerStatus && !error.registerError) &&
                    <Button
                        type="button"
                        className="registerButton--cancel-register"
                        onClick={() => {
                            navigate("/login")
                        }}
                        buttonText="Cancel"
                    />
                    }
                </footer>
            }
        />
    )
}

export default Register