import React, { createContext, useContext, useState } from 'react';

export const AuthContexts = createContext();
export const isAuthTokenContext = createContext();
export const addCnversationsContext = createContext();
export const messageContext = createContext();
export const useAuthContext = () => {
    return useContext(AuthContexts)
}

function AuthContext({ children }) {
    const [authResponse, setAuthResponse] = useState({});
    const [isAuthToken, setIsAuthToken] = useState(false);
    const [addConversations, setAddConversations] = useState({});
    const [addMessages, setAddMessages] = useState({});


    return (
        <>
            <AuthContexts.Provider value={{ authResponse, setAuthResponse }}>
                <isAuthTokenContext.Provider value={{ isAuthToken, setIsAuthToken }}>
                    <addCnversationsContext.Provider value={{ addConversations, setAddConversations }}>
                        <messageContext.Provider value={{ addMessages, setAddMessages }}>
                            {children}
                        </messageContext.Provider>
                    </addCnversationsContext.Provider>
                </isAuthTokenContext.Provider>
            </AuthContexts.Provider>
        </>
    );
}

export default AuthContext;
