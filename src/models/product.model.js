import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please provide name of product"],
            trim: true,
            maxlength: [30, "name can not be more than 30 characters"],
            index: true
        },
        description: {
            type: String,
            require: [true, "please provide description of product"],
            maxLength: [500, "description is can not more than 200"]
        },
        image: {
            type: String,
            // required: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        },
        brand: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "brand"
        },
        review: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        price: {
            type: Number,
            required: [true, "Please provide product price"],
            default: 0
        },
        stock: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
)


export const Product = mongoose.model("Product", productSchema)