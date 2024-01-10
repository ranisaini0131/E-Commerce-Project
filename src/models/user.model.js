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

        userName: {
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
            minlength: 6,
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
        }
    },
    {
        timestamps: true
    }
)


//password hashing
userSchema.pre("save", async function (next) {

    //encrypt only on password modified
    if (this.isModified("password")) return next();

    //password encrypted
    this.password = bcrypt.hash(this.password, 10)

})

//checking Password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}


userSchema.methods.generateAccessToken = function () {
    jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName,
            fullName: this.fullName
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}



export const User = mongoose.model("User", userSchema)