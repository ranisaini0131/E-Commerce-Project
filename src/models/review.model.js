import mongoose, { mongo } from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        comment: {
            type: String,
            maxLength: [100, "Comment can not be more than 100 words"]
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    },
    {
        timestamps: true
    }
)


export const Review = mongoose.model("Review", reviewSchema)