import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const [currentMonitor, setCurrentMonitor] = useState(
        JSON.parse(localStorage.getItem("monitor")) || null
    );

    const login = async (inputs) => {
        const res = await axios.post("http://localhost:8800/api/auth/login", inputs, {
            withCredentials: true
        })

        console.log(res.data)

        if(res.data.role == 0){
            setCurrentMonitor(res.data.body)
        }
        else{
            setCurrentUser(res.data.body)
        }

        return res.data.role
    }
 
    useEffect( () => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])

    useEffect( () => {
        localStorage.setItem("monitor", JSON.stringify(currentMonitor))
    }, [currentMonitor])

    return(
        <AuthContext.Provider value={{currentUser, currentMonitor, login}}>{children}</AuthContext.Provider>
    )
}