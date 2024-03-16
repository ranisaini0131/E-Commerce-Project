import axios from "axios";
import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: "",
    });

    //in every request header will included by default
    axios.defaults.headers.common["Authorization"]=auth?.token

    //to continue after login 
    useEffect(() => {
        const data = localStorage.getItem("auth")
        if (data) {
            const parseData = JSON.parse(data)
            setAuth({
                ...auth,
                user: parseData.user,
                token:parseData.token
            })
        }
    }, [])

    const AuthContextProvider= AuthContext.Provider

    return (
        <AuthContextProvider value={[auth, setAuth]}>
            {children}
        </AuthContextProvider>
    )
};

// custom Hook

export default function useAuth() {
    return useContext(AuthContext);
}




