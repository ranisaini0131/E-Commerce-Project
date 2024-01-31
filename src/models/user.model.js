import mongoose from "mongoose";


const userSchema = new mongoose.Schema(

    {

        fullName: {
            type: String,
            required: [true, 'Please provide name'],
            lowerCase: true,
            unique: true,
            trim: true,

        },

        username: {
            type: String,
            required: [true, 'Please provide name'],
            lowerCase: true,
            unique: true,
            trim: true,
            index: true

        },

        email: {
            type: String,
            unique: true,
            required: [true, 'Please provide name'],
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: [true, 'Please provide password'],
        },

        avatar: {
            type: String,
            required: true
        },

        coverImage: {
            type: String,
        },

        role: {
            type: String,
            required: true,
            enum: ['user', 'admin'],
            default: 'user'
        },

        refreshToken: {
            type: String
        },

        otp: {
            type: Number
        }
    },
    {
        timestamps: true
    }
)



export const User = mongoose.model("User", userSchema)