import React, {createContext, useEffect, useState} from "react";
import axios from 'axios'

const AuthContext = createContext({})

function AuthContextProvider({children}) {
    const [authState, setAuthState] = useState(
{user: undefined,
        status: 'pending'
    })

    const token = localStorage.getItem('token')

    useEffect(() => {
        if (token) {
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
                            name: data.username,
                            id: data.id, mail: data.email
                        },
                        status: 'done'
                    })

                    console.log(data)
                    console.log(authState)
                } catch (e) {
                    console.error(e)
                }
            }
            getUser()
        }
    }, [])

    const authData = {
        authState,
        setAuthState
    }


    return(
        <AuthContext.Provider value={authData}>
            {authState.status === 'done' ? children : <p>Loading</p>}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider