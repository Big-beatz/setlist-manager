import React, {createContext, useState} from 'react'

export const UserContext = createContext({})

function UserContextProvider({children}){
    const [setlists, updateSetlists] = useState([])

    const setlistData = {
        setlists: setlists,
        updateSetlists: updateSetlists,
        addSetlist: addSetlist
    }


    function addSetlist(nameOfSetlist, listOfSongs) {
        if (setlists.length === 0){
            updateSetlists([{
                setlistName: nameOfSetlist,
                setlistArray: listOfSongs}])
        } else{
                updateSetlists([...setlists,
                    {setlistName: nameOfSetlist,
                        setlistArray: listOfSongs}])
        }
    }


    return(
        <UserContext.Provider value={setlistData}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider