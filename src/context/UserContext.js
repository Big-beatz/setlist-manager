import React, {createContext, useState} from 'react'

const UserContext = createContext({})

function UserContextProvider({children}){
    const [setlists, setSetlists] = useState({setlistName: '', setlistArray: []})
    //
    // function addSetlist(){
    //     setSetlists((setlists) => {...setlists, setlistName})
    //
    // }

    const data = {
        userName: undefined,
        setlist: setlists
    }
    return(
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider