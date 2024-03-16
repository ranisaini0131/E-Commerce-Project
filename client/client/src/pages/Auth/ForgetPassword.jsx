import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Layout from '../../components/Layout/Layout.jsx'

function ForgetPassword() {
    const [email, setEmail]= useState("")
    const [username, setUsername] = useState("")
const navigate= useNavigate()
    
    const handleSubmit = async (e) => { 
        e.preventDefault();
        try {
            
            const res = await axios.post("http://localhost:5000/api/v1/users/forget-password", {
                username,
                email
            })
            console.log(res,"19")

            if (res.data.status ==="success") {
                navigate("/verify-otp")
            } else {
                console.log(res.data.message)
            }

        } catch (error) {
            console.log("Something went wrong",error)

        }
    }


  return (
      <Layout title="Forget Password - Ecommerce App">
         
          <h1>Forget Password</h1>
          <div className="form-container ">
              <form onSubmit={handleSubmit}>
              <div className="mb-3">
            <input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Username "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
                  </div>
          <button type="submit" className="btn btn-primary">
            Send OTP
          </button>
        </form>
      </div>
                
    </Layout>
  )
}

export default ForgetPassword