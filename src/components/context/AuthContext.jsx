import React, { createContext, useContext, useEffect, useState } from 'react';

export const AuthContexts = createContext();
export const isAuthTokenContext = createContext();
export const addCnversationsContext = createContext();
export const messageContext = createContext();
export const setDetailContext = createContext()
export const fetchMsgContext = createContext()

export const useAuthContext = () => {
    return useContext(AuthContexts)
}

function AuthContext({ children }) {
    const [authResponse, setAuthResponse] = useState({});
    const [isAuthToken, setIsAuthToken] = useState(false);
    const [addConversations, setAddConversations] = useState({});
    const [addMessages, setAddMessages] = useState([]);
    const [getName, setgetName] = useState([])
    const [fetchMsg, setFetchMsg] = useState(null)
    useEffect(() => {
        const isToken = sessionStorage.getItem('token')
        console.log('loaded', isToken);
        if (isToken) {
            setIsAuthToken(true)
        } else {
            setIsAuthToken(false)
        }
    }, [])

    return (
        <>
            <AuthContexts.Provider value={{ authResponse, setAuthResponse }}>
                <isAuthTokenContext.Provider value={{ isAuthToken, setIsAuthToken }}>
                    <addCnversationsContext.Provider value={{ addConversations, setAddConversations }}>
                        <messageContext.Provider value={{ addMessages, setAddMessages }}>
                            <setDetailContext.Provider value={{ getName, setgetName }}>
                                <fetchMsgContext.Provider value={{ fetchMsg, setFetchMsg }}>
                                    {children}
                                </fetchMsgContext.Provider>
                            </setDetailContext.Provider>
                        </messageContext.Provider>
                    </addCnversationsContext.Provider>
                </isAuthTokenContext.Provider>
            </AuthContexts.Provider>
        </>
    );
}

export default AuthContext;