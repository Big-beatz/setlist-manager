import React, {createContext} from "react";

const AuthContext = createContext({})

function AuthContextProvider({children}) {
    //ruimte voor state waar de context-data in komt

    return(
        <AuthContext.Provider value={null}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider