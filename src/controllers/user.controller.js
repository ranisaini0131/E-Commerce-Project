import { User } from "../models/user.model.js"

const getUserById = async (req, res) => {
    try {
        const { id } = req.query

        const user = await User.findById(id).select("-password")
        return res
            .status(200)
            .json({
                status: "success",
                data: user
            })

    } catch (error) {
        return res
            .status(500)
            .json({
                status: "failed",
                error: error.message
            })
    }


    // try {
    //     console.log(req.user);
    //     res.send(req.user)
    // } catch (error) {
    //     console.log(error);
    // }
}

const getAllUser = async (req, res) => {
    try {
        const users = await User.find()

        return res
            .status(200)
            .json({
                status: "success",
                data: users
            })


    } catch (error) {

        return res
            .status(500)
            .json({
                status: "failed",
                error: error.message
            })
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params

        const updatedUser = await User.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )

        return res
            .status(200)
            .json({
                status: "success",
                data: updatedUser
            })

    } catch (error) {

        return res
            .status(500)
            .json({
                status: "failed",
                error: error.message
            })
    }



}


const updateProfilePicture = async (req, res) => {
    try {
        console.log("hello")
        const { _id } = req.params


        const userImage = req.files?.avatar[0]?.path

        const user = await User.findByIdAndUpdate(
            _id,
            {
                $set: { avatar: userImage }
            },
            { new: true }
        );

        return res
            .status(200)
            .json({
                status: "success",
                data: user
            })

    } catch (error) {
        return res
            .status(500)
            .json({
                status: "failed",
                error: error.message
            })
    }
}





export {
    getUserById,
    getAllUser,
    updateUser,
    updateProfilePicture
}