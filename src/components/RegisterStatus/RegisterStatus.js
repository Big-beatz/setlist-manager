import React from "react";
import {Button} from "../Button/Button";
import {useNavigate} from "react-router-dom";
import './RegisterStatus.scss'

function RegisterStatus({registerStatus, error, userName, clearRegistration, toLogin}){
    const navigate = useNavigate();

    return(
        <>
            {registerStatus &&
            <div className="registerStatus--div__succes">
                <h1>Congratulations {userName}!</h1>
                <p>Registration is complete.</p>
                <p>To login press the continue button.</p>
                <Button
                    type="button"
                    buttonText="Continue"
                    onClick={() => {
                    navigate("/login")
                }}
                />
            </div>
            }
            {error &&
            <div className="registerStatus--div__error">
                <h1>Oops</h1>
                <p>Something went wrong.</p>
                <p>Make sure the mailadres has the proper format.</p>
                <p>Please try again with a different username. </p>
                <Button
                type="button"
                buttonText="Try Again"
                onClick={clearRegistration}
                />
            </div>
            }
        </>
    )
}

export default RegisterStatus