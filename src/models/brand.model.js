import mongoose from "mongoose";



const brandSchema = new mongoose.Schema(
    {
        brandName: {
            type: String,

        }
    },
    {
        timestamps: true
    }
)


export const Brand = mongoose.model("Brand", brandSchema)