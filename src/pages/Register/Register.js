import React from 'react'
import {Button} from "../../components/Button/Button";
import {useNavigate} from "react-router-dom";
import Background from "../../components/Background/Background";
import './Register.scss'

function Register(){
    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();
        console.log("Geregistreerd")
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
                            onSubmit={handleSubmit}
                        >
                            <label
                                htmlFor="mailadres"
                                id="mailadres"
                            >
                                E-mailadres
                            </label>
                            <input
                                className="textInput"
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
                                className="textInput"
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
                                className="textInput"
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
                                className="textInput"
                                type="password"
                                id="password-again"
                            />
                            <Button
                                type="submit"
                                className="register-form__button"
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