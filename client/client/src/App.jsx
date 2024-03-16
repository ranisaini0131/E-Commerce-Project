import './index.css'
import dotenv from "dotenv"
import {Routes, Route} from "react-router-dom"
import HomePage from './pages/HomePage.jsx'
import Register from "./pages/Auth/Register.jsx"
import Login from "./pages/Auth/Login.jsx"
import About from "./pages/About.jsx"
import Contact from "./pages/Contact.jsx"
import PageNotFound from "./pages/PageNotFound.jsx"
import Policy from "./pages/Policy.jsx"
import Dashboard from "./pages/user/Dashboard.jsx"
import PrivateRoute from './components/Routes/Private.jsx'
import ForgetPassword from './pages/Auth/ForgetPassword.jsx'
import VerifyOtp from './pages/Auth/VerifyOtp.jsx'

// dotenv.config({
//   path: "./.env"
// })
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='' element={<Dashboard/>}/>
        </Route>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/forget-password' element={<ForgetPassword/>} />
        <Route path='/verify-otp' element={<VerifyOtp/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/policy' element={<Policy/>} />
        <Route path='/*' element={<PageNotFound/>} />
      </Routes>
    </>
  )
}

export default App
