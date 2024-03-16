import mongoose from "mongoose";


const userSchema = new mongoose.Schema(

    {

        // fullName: {
        //     type: String,
        //     // required: [true, 'Please provide name'],
        //     lowerCase: true,
        //     trim: true,

        // },

        username: {
            type: String,
            required: [true, 'Please provide username'],
            lowerCase: true,
            // unique: true,
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
            // required: true
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
        },

        otpExpire: Date
    },
    {
        timestamps: true
    }
)

userSchema.method.otpExpire = Date.now() + 2 * 60 * 1000; //2 min expiration time

export const User = mongoose.model("User", userSchema)

