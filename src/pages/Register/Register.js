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
            top={
                <>
                    <h1 className="setlist">Setlist</h1>
                    <h1 className="manager">Manager</h1>
                < />
            }
            center={<>
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
            }
            bottom={
                <>
                    <Button
                        type="button"
                        className="registerButton--cancel-register"
                        onClick={() => {
                            navigate("/login")
                        }}
                    >
                                <span>
                                        Cancel
                                </span>
                    </Button>
                </>
            }
            />
    )
}

export default Register