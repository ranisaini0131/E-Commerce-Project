import { useState, useEffect, useNavigate} from "react";
import useAuth from "../../context/auth.jsx";
import {Outlet} from "react-router-dom"
import axios from "axios";
import Spinner from "../Spinner.jsx";


export default function PrivateRoute() {
    const [ok, setOk] = useState(false)
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate();

    

    // Check if the user is authenticated when
    useEffect(() => {
        const authCheck = async()=> {
            const res = await axios.get("/api/v1/users/user-auth")
            
            if (res.data.ok) {
                setOk(true);
            } else {
                setOk(false)
            }
        }

        if (auth?.token) authCheck();
     }, [auth?.token])
    
    return ok? <Outlet/> : <Spinner/>
}