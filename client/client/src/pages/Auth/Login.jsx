import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout.jsx'
import { toast } from "react-toastify"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import  useAuth  from '../../context/auth.jsx'

export default function Login() {

    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:5000/api/v1/users/login", { username, email, password })

            if (res.data.status === "success") {
                toast.success(res.data.message)
                setAuth({
                    ...auth,
                    user: res.data.data.user,
                    token: res.data.data.token
                });
                localStorage.setItem("auth", JSON.stringify(res.data.data))
                navigate("/");
            } else {
                toast.error(res.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }


    return (
        <Layout title={"Login - E-commerce App"}>
            <div className='register'>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputUsername" className="form-label">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            className="form-control"
                            id="exampleInputUsername"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary">
                        Login
                    </button>
                    <button
                        type="submit"
                        onClick={()=> navigate("/forget-password")}
                        className="btn btn-primary"
                    >
                        Forget password
                    </button>
                </form>

            </div>
        </Layout>
    )
}
