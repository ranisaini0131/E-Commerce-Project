import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        quantity: {
            type: Number,
            required: true,
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)


export const Cart = mongoose.model("Cart", cartSchema)