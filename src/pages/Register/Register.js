import React, {useState} from 'react'
import {Button, DisabledButton} from "../../components/Button/Button";
import {useNavigate} from "react-router-dom";
import Background from "../../components/Background/Background";
import './Register.scss'
import axios from 'axios'

function Register(){
    const navigate = useNavigate();
    const [loading, toggleLoading] = useState(false)
    const [error, toggleError] = useState(false)
    const [invalidInput, toggleInvalidInput] = useState({
        mailadres: false,
        username: false,
        password: false,
        passwordAgain: false
    })
    const [userRegistration, setUserRegistration] = useState({
        mailadres: '',
        username: '',
        password: '',
        passwordAgain: ''
    })

    async function handleRegister(e){
        e.preventDefault()
        if (userRegistration.mailadres.includes("@") === false){
            toggleInvalidInput({...invalidInput, mailadres:true})
        } else if(userRegistration.username.length < 6){
            toggleInvalidInput({...invalidInput, username:true})
        } else if(!userRegistration.password.length < 6){
            toggleInvalidInput({...invalidInput, password:true})
        } else if (userRegistration.password !== userRegistration.passwordAgain){
            toggleInvalidInput({...invalidInput, passwordAgain:true})
        }
        else {
            try {
                const data = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
                    "username": userRegistration.username,
                    "email": userRegistration.mailadres,
                    "password": userRegistration.password,
                    "role": ["user"]
                })
                toggleLoading(true)
                console.log(data)
                navigate('/login')
            } catch (e) {
                toggleError(true)
                console.error(e)
            }
        }
    }

    console.log(invalidInput)

    function handleSubmit(e){
        e.preventDefault();
        navigate("/login")
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
                                {invalidInput.mailadres &&
                                    <p className="register-form__invalid-input">
                                        Mailadres requires a '@' token.
                                    </p>
                                }
                            </label>
                            <input
                                className="textInput"
                                type="text"
                                id="mailadres"
                                value={userRegistration.mailadres}
                                onChange={
                                    e => setUserRegistration({
                                    ...userRegistration,
                                    mailadres: e.target.value
                                })}
                            />
                            <label
                                htmlFor="username"
                                id="username"
                            >
                                Username
                                {invalidInput.username &&
                                <p className="register-form__invalid-input">
                                    Username must be at least 6 tokens. No empty spaces allowed
                                </p>
                                }
                            </label>
                            <input
                                className="textInput"
                                type="text"
                                id="username"
                                value={userRegistration.username}
                                onChange={
                                    e => setUserRegistration({
                                    ...userRegistration,
                                    username: e.target.value})}
                            />
                            <label
                                htmlFor="password"
                                id="password"
                            >
                                {invalidInput.password &&
                                <p className="register-form__invalid-input">
                                    Password must be at least 6 tokens. No empty spaces allowed                                </p>
                                }
                                Password
                            </label>
                            <input
                                className="textInput"
                                type="password"
                                id="password"
                                value={userRegistration.password}
                                onChange={
                                    e => setUserRegistration({
                                    ...userRegistration,
                                    password: e.target.value})}
                            />
                            <label
                                htmlFor="password-again"
                                id="password-again"
                            >
                                Password again
                                {invalidInput.passwordAgain &&
                                <p className="register-form__invalid-input">
                                    Password is not the same
                                </p>
                                }

                            </label>
                            <input
                                className="textInput"
                                type="password"
                                id="password-again"
                                value={userRegistration.passwordAgain}
                                onChange={
                                    e => setUserRegistration({
                                        ...userRegistration,
                                        passwordAgain: e.target.value})}
                            />
                                <Button
                                    type="submit"
                                    className="register-form--button"
                                    buttonText="Finish"
                                />

                        </form>
                    </div>
            </>
            }
            bottomContent={
                <>
                    <Button
                        type="button"
                        className="registerButton--cancel-register"
                        onClick={() => {
                            navigate("/login")
                        }}
                        buttonText="Cancel"
                    />
                </>
            }
            />
    )
}

export default Register