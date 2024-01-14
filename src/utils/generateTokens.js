import { User } from "../models/user.model.js"


export const genrateAccessAndRefreshToken = async (userId) => {

    //get user access here
    const user = await User.findById(userId)
    console.log(user, "7")

    //generate tokens
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()


    //save in to user data
    user.refreshToken = refreshToken;
    await user.save({ validationBeforeSve: false })

    return {
        accessToken,
        refreshToken
    }
}
