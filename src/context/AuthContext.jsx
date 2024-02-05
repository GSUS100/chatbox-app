import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { ChatContextProvider } from "./ChatContext";


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
     
    const [currentUser, setCurrentUser] = useState({});

     useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            console.log(user);
        });



        return () => {
            unsub();
        }
     }, []);


    return (
        <AuthContext.Provider value={{currentUser}}>
            <ChatContextProvider>
            {children}
            </ChatContextProvider>
        </AuthContext.Provider>
    );





};