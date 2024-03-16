import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout.jsx'


function VerifyOtp() {

  const [otp, setOtp] = useState("")
  
  const handleSubmit = (e) => {
    e.preventDefault()

    
  }


  return (
    <Layout>
      <h1>VerifyOtp</h1>
      <div className="form-container ">
              <form onSubmit={handleSubmit}>
              <div className="mb-3">
            <input
              type="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your OTP "
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Verify
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default VerifyOtp