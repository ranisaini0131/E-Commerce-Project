import { User } from "../models/user.model.js"



const registerUser = async (req, res) => {
    try {
        console.log(req.body)
        return res.json({
            status: "success",
            msg: req.body
        })
    } catch (error) {
        console.log(error)
    }
}




const loginUser = async (req, res) => {

}

const logoutUser = async (req, res) => {

}

const updatePasswordRequest = async (req, res) => {

}

const updatePassword = async (req, res) => {

}

const changePassword = async (req, res) => {

}







export {
    registerUser,
    loginUser,
    logoutUser,
    updatePasswordRequest,
    updatePassword,
    changePassword
}




