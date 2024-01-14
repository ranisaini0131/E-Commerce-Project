import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"


const registerUser = async (req, res) => {
    try {

        //get user details from frontend
        const { fullName, username, email, password } = req.body

        //validation
        if (!(fullName || username || email || password)) {
            return res.status(400).json({
                status: "failed",
                message: "Please provide all fields",
            })
        }


        //check if user already exists or not
        const existedUser = await User.findOne({
            $or: [{ username }, { email }]
        })

        if (existedUser) {
            return res.status(409).json({
                status: "failed",
                message: "User already exists"
            })
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10)


        //extracting path
        const avatarPath = req.files?.avatar[0]?.path
        const coverImagePath = req.files?.coverImage[0]?.path

        //create new user

        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword,
            avatar: avatarPath,
            coverImage: coverImagePath

        })
        await newUser.save()


        //remove password and refresh token
        const createdUser = await User.findById(newUser._id).select(
            "-password -refreshToken"
        )

        if (!createdUser) {
            return res.status(500).json({
                status: 'error',
                message: "something went wrong while registering the user"
            })
        }

        //return response
        return res.json({
            status: "success",
            msg: "User Registered successfully",
            createdUser
        })
    } catch (error) {
        console.log(error)
    }
}




const loginUser = async (req, res) => {
    //get user entered data
    const { username, email, password } = req.body


    //check fields
    if (!(username || email)) {
        return res.status(422).json({
            status: "fail",
            message: "Please provide username or email"
        })
    }

    //check existed user
    const user = await User.findOne({
        $or: [{ username }, { email }]
    })


    if (!user) {
        return res.status(401).json({
            status: "failed",
            message: "User does not exist"
        })
    }


    //validate passowrd
    const isPasswordValidate = await bcrypt.compare(password, user.password)
    if (!isPasswordValidate) {
        return res.status(401).json({
            status: "failed",
            message: "Invalid user credentials",
            error: error.message
        })
    }

    //generate token
    const token = jwt.sign(
        {
            user: user
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )


    //after password validation, generate tokens
    // const { accessToken, refreshToken } = await genrateAccessAndRefreshToken(user._id)




    //response to user
    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    // //cookies
    // const options = {
    //     httpOnly: true,
    //     secure: true
    // }

    //return response 
    return res
        .status(200)
        // .cookie("accessToken", accessToken, options)
        // .cookie("refreshToken", refreshToken, options)
        .json({
            status: 'success',
            data: {
                user: loggedInUser,
                token: token
            },
            message: "User Login Successfully"
        })



}
const logoutUser = async (req, res) => {
    console.log(req.user, "165")
    User.findByIdAndUpdate(
        req.user._id,
        {
            new: true
        }
    )

    // const option = {
    //     httpOnly: true,
    //     secure: true
    // }

    return res
        .status(200)
        // .clearCookie("accessToken", option)
        // .clearCookie("refreshToken", option)
        .json({
            status: "success",
            data: {},
            message: "Logged Out Successfully!"
        })
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




