import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"
import { sendMail } from "../utils/nodemailer.js"



const registerUser = async (req, res) => {
    try {

        //get user details from frontend
        const { username, email, password, role } = req.body

        //validation
        if (!(username || email || password || role)) {
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
            // fullName,
            username,
            email,
            password: hashedPassword,
            avatar: avatarPath,
            coverImage: coverImagePath,
            role

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
            message: "User Registered successfully",
            createdUser
        })
    } catch (error) {
        console.log(error)
    }
}


const loginUser = async (req, res) => {
    //get user entered data
    console.log(req.body)
    try {
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

//forgot password
const forgetPassword = async (req, res) => {
    try {
        const { username, email } = req.body


        if (username || email) {

            //username, email exists or not
            const existUser = await User.findOne({ username })


            if (existUser) {

                //generate OTP
                const generateOTP = () => {
                    return Math.floor(1000 + Math.random() * 9000).toString()
                }
                existUser.otp = generateOTP()
                const userOtp = existUser.otp
                console.log(userOtp)

                //save into user model
                const user = await User.findOneAndUpdate({ username }, { $set: { otp: userOtp } }, { new: true })
                console.log(user, "223")

                //config sendMail args
                const subject = "Ecommerce App OTP"
                const html = `Your One Time Password is ${userOtp}`

                // /this method send email
                const response = await sendMail({
                    to: email,
                    subject,
                    html
                });


                return res.status(200).json({
                    status: "success",
                    message: `OTP send Successfully to ${existUser.email}`,

                })

            } else {
                return res.status(422).json({
                    status: "fail",
                    message: "Wrong Email or username",
                    error: error.message
                })
            }


        }
        else {
            return res.status(422).json({
                status: "fail",
                message: "Please provide username or email",
                error: error.message
            })
        }

    } catch (error) {
        console.log("ERROR: ", error)
        User.otp = undefined,
            User.otpExpire = undefined
    }


}

//hit on verify Button
const verifyOTP = async (req, res) => {

    //verifyandChange Password
    //otp dene k baad verify krk loginkrwana h
    //new password bn jaega to agar login krega  to nrew token apneaap generate ho hijaega


    const { email, OTP, new_password } = req.body

    const user = await User.findOne({ email })


    try {
        if (OTP === user.otp) {
            await User.findOneAndUpdate(
                { email },
                {
                    $set: { otp: null, password: new_password }
                },
                {
                    new: true
                }
            )
        }

        const hashedPassword = await bcrypt.hash(user.password, 10)


        const nUser = await User.findOneAndUpdate(
            { email },
            {
                $set: {
                    password: hashedPassword
                }
            },
            {
                new: true
            }

        ).select(
            "-password"
        )

        return res
            .status(200)
            .json({
                status: 'success',
                message: "Password changed successfully",
                nUser
            })


    } catch (error) {
        return res
            .status(200)
            .json({
                status: 'failed',
                message: error.message
            })
    }
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
    forgetPassword,
    verifyOTP,
    changePassword
}




