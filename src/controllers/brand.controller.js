import { Brand } from "../models/brand.model.js"

const createBrand = async (req, res) => {
    try {

        const newBrand = await Brand.create(req.body)

        return res
            .status(200)
            .json({
                status: "success",
                message: "Order Created successfully",
                Brand: newBrand
            })
    } catch (error) {
        return res
            .status(500)
            .json({
                status: "failed",
                message: error.message
            })
    }
}

const getBrandById = async (req, res) => {

    try {
        const { id } = req.query
        console.log(id)
        const brand = await Brand.findById(id)

        return res
            .status(200)
            .json({
                status: "success",
                brand,

            })

    } catch (error) {
        return res
            .status(400)
            .json({
                status: "failed",
                message: error.message,

            })
    }
}

const getAllBrands = async (req, res) => {

    try {
        const allBrands = await Brand.find()

        return res
            .status(200)
            .json({
                status: "success",
                allBrands,

            })

    } catch (error) {
        return res
            .status(400)
            .json({
                status: "failed",
                message: error.message,

            })
    }
}

const deleteBrand = async (req, res) => {
    try {

        const { id } = req.query

        const deletedBrand = await Brand.findByIdAndDelete(id)

        return res
            .status(200)
            .json({
                status: "success",
                deletedBrand,

            })

    } catch (error) {
        return res
            .status(400)
            .json({
                status: "failed",
                message: error.message,

            })
    }
}

const updateBrand = async (req, res) => {
    try {

        const { id } = req.query

        const updateBrands = await Brand.findByIdAndUpdate(id, req.body, { new: true })

        return res
            .status(200)
            .json({
                status: "success",
                updateBrands

            })

    } catch (error) {
        return res
            .status(400)
            .json({
                status: "failed",
                message: error.message,

            })
    }
}

export {
    createBrand,
    getBrandById,
    getAllBrands,
    deleteBrand,
    updateBrand
}