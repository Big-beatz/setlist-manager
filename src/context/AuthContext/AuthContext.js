import React, {createContext, useEffect, useState} from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import {useNavigate} from 'react-router-dom'
import Background from '../../components/Background/Background'

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
                async function getUser() {
                    try {
                        const {data} = await axios.get('https://frontend-educational-backend.herokuapp.com/api/user',
                            {
                                headers: {
                                    'ontent-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`,
                                }
                            })
                        if(data.info){
                            setAuthState({
                                ...authState,
                                user: {
                                    username: data.username,
                                    mail: data.email,
                                    id: data.id,
                                    info: JSON.parse(data.info)
                                },
                                authStatus: 'done',
                                isAuth: true
                            })
                        } else {
                            setAuthState({
                                ...authState,
                                user: {
                                    username: data.username,
                                    mail: data.email,
                                    id: data.id,
                                    info: []
                                },
                                authStatus: 'done',
                                isAuth: true
                            })
                        }
                    } catch (e) {
                        setAuthState({
                            ...authState,
                            user:null,
                            isAuth: false,
                            authStatus: 'done'
                        })
                    }
                }
                getUser()
            } else{
                localStorage.clear()
                setAuthState({
                    ...authState,
                    user:null,
                    isAuth: false,
                    authStatus: 'done'
                })
            }
        } else {
            setAuthState({
                ...authState,
                user:null,
                isAuth: false,
                authStatus: 'done'
            })
        }
    }, [])

    function logout() {
        localStorage.clear()
        setAuthState({
            ...authState,
            user: null,
            isAuth: false,
            authStatus: 'done',
        })
        sessionStorage.clear()
        navigate('/login')
    }

    const authData = {
            authState: authState,
            setAuthState: setAuthState,
            logout: logout,
            token: token
        }

    return (
        <AuthContext.Provider value={authData}>
            {authState.authStatus === 'done' ?
                children
            :
            <Background
                classNameTop='background-top'
                classNameCenter='background-center'
                classNameBottom='background-bottom'
                centerContent={
                   <h1>Loading</h1>
                }
            />
            }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider