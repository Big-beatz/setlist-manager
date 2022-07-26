import React from "react";
import {Button} from "../Button/Button";
import {useNavigate} from "react-router-dom";

function RegisterStatus({registerStatus, error, userName, clearRegistration}){
    const navigate = useNavigate();

    return(
        <>
            {registerStatus &&
            <div>
                <h1>Congratulations {userName}!</h1>
                <p>Registration is complete, return to Login</p>
                <Button
                    buttonText="Login"
                    onCLick={() => {navigate("/login")}}
                />
            </div>
            }
            {error &&
            <div>
                <h1>Oops</h1>
                <p>Something went wrong, most likely your username is already in use. Try again.</p>
                <Button
                buttonText="Try Again"
                onClick={clearRegistration}
                />
            </div>
            }
        </>
    )
}

export default RegisterStatus