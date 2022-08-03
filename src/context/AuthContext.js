import React, {createContext, useEffect, useState} from "react";
import axios from 'axios'
import jwtDecode from "jwt-decode";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext({})

function AuthContextProvider({children}) {
    const navigate = useNavigate()
    const [authState, setAuthState] = useState(
        {
            user: null,
            authStatus: 'pending',
            isAuth: false
        })
    const token = localStorage.getItem('token')

    useEffect(() => {
        const currentTime = new Date().getTime().valueOf() / 1000
        if (token) {
            const decodedToken = jwtDecode(token)

            if (decodedToken.exp > currentTime) {
                console.log(currentTime)
                async function getUser() {
                    try {
                        const {data} = await axios.get('https://frontend-educational-backend.herokuapp.com/api/user',
                            {
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${token}`,
                                }
                            })
                        setAuthState({
                            ...authState,
                            user: {
                                username: data.username,
                                mail: data.email,
                                id: data.id
                            },
                            authStatus: 'done',
                            isAuth: true
                        })
                        console.log(data)
                    } catch (e) {
                        console.error(e)
                    }
                }
                getUser()
            }
        } else {
            setAuthState({
                ...authState,
                user:null,
                authStatus: 'done'
            })
        }
    }, [])


    function logout() {
        localStorage.clear()
        setAuthState({
            ...authState,
            user: null,
            authStatus: 'done',
            isAuth: false
        })
        sessionStorage.clear()
        navigate('/login')
    }

    const authData = {
            authState: authState,
            setAuthState: setAuthState,
            logout: logout
        }

    return (
        <AuthContext.Provider value={authData}>
            {authState.authStatus === 'done' ? children : <p>Loading</p>}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider