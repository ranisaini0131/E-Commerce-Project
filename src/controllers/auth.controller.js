import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"
import nodemailer from "nodemailer"

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
    try {
        const { username, email, password } = req.body
        console.log(password)

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
                user: user,
                passowrd: req.body.passowrd
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

    } catch (error) {
        console.log("Error: ", error.message)
    }
}


const logoutUser = async (req, res) => {

    try {
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
    } catch (error) {
        console.log("ERROR: ", error.message)
    }
}


const SendOTP = async (req, res) => {
    try {
        const { username, email } = req.body
        console.log(username, email, "200")

        if (username || email) {

            //username, email exists or not
            const existesUser = await User.findOne({
                $or: [{ username }, { email }]
            })



            console.log(existesUser, "207")

            if (existesUser) {

                //otp generate krwa k mail pr behjni h

                const generateOTP = () => {
                    return Math.floor(1000 + Math.random() * 9000).toString()
                }
                const otp = generateOTP()
                console.log(otp)
                existesUser.OTP = otp

                //Nodemailer configuartion
                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: process.env.MAIL_USERNAME,
                        pass: process.env.MAIL_PASSOWRD
                    }
                })

                // console.log(existesUser.email)
                //where to send the email with data
                let mailOptions = {
                    from: process.env.MAIL_USERNAME,
                    to: "ranisaini414@gmail.com",
                    subject: "OTP TO RESET PASSWORD",
                    text: `Your OTP is: ${otp}`
                }

                //this method send email 
                transporter.sendMail(mailOptions, (error, info) => {
                    if (!error) {
                        res.status(200).json({
                            message: 'Email has been sent',
                        })
                        console.log(info.response)
                    } else {
                        console.log('Error occurred', error);
                    }
                })

                return res.status(200).json({
                    status: "success",
                    message: "OTP send Successfully",
                })

            } else {
                return res.status(422).json({
                    status: "fail",
                    message: "Wrong Email or username",
                    error: error.message
                })
            }


        } else {
            return res.status(422).json({
                status: "fail",
                message: "Please provide username or email",
                error: error.message
            })
        }

    } catch (error) {
        console.log("ERROR: ", error)
    }


}

const verifyOTP = async (req, res) => {

    //verifyandChange Password
    //otp dene k baad verify krk loginkrwana h
    //new password bn jaega to agar login krega  to nrew token apneaap generate ho hijaega


    const { otp } = req.body

    const user = await User.findOne()
}


const changePassword = async (req, res) => {
    try {
        const { password } = req.user
        const { old_password, new_password } = req.body


        if (old_password || new_password) {
            const passwordMatched = await bcrypt.compare(old_password, password);

            if (passwordMatched) {
                const newHashedPassword = await bcrypt.hash(new_password, 10)

                const user = await User.findByIdAndUpdate(req.user._id, {
                    password: newHashedPassword
                })

                return res
                    .status(200)
                    .json({
                        status: 'success',
                        message: "Passowrd changed successfully",
                        user
                    })


            } else {
                return res.status(422).json({
                    status: "fail",
                    message: "Invalid credentials",
                    error: error.message
                })
            }

        }

    } catch (error) {
        console.log("ERROR: ", error.message)
    }

}







export {
    registerUser,
    loginUser,
    logoutUser,
    SendOTP,
    verifyOTP,
    changePassword
}




