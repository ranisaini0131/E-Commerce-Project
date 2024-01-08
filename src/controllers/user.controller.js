import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"



const registerUser = asyncHandler(async (req, res) => {


    //get user details from frontend
    const { fullName, email, password, username } = req.body
    console.log("email: ", email)


    //checking all fields
    if ([fullName, email, password, username].some((fields) =>
        fields.trim === "")) {
        throw new ApiError(400, "All fields are required")
    }

    //checking user already existed or not
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(400, "User with email or username already existed")
    }

    //check for images, check for aatar
    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    //checking avatar is avalaible or not
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is reqiored")
    }

    //upload on cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    //check avatar
    if (!avatar) {
        throw new ApiError(400, "Avatar file is reqiored")
    }

    //create user object

    const user = awaitUser.create({
        fullName,
        avatar: avatar.url || "",
        coverImage: coverImage?.url || "",
        password,
        username: username.toLowerCase()
    })

    //resmove password and refresh token field from response

    const createUser = await User.findById(user._id).select(
        "-password refreshToken"
    )


    //check for user creation
    if (!createUser) {
        throw new ApiError(500, "something went wrong while registering the user")
    }


    //return response
    return res.status(201).json(
        new ApiResponse(200, "user registered successfully")
    )

})









export {
    registerUser
}




