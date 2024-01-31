import { Category } from "../models/category.model.js"

const createCategory = async (req, res) => {
    try {

        const category = new Category(req.body)
        await category.save()

        return res
            .status(200)
            .json({
                status: "success",
                category: category
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

const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const category = await Category.findById(id)

        return res
            .status(200)
            .json({
                status: "success",
                category,

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

const getAllCategories = async (req, res) => {
    try {
        const allCategories = await Category.find()

        return res
            .status(200)
            .json({
                status: "success",
                allCategories,

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

const updateCategory = async (req, res) => {
    try {

        const { id } = req.params

        const updateCategory = await Category.findByIdAndUpdate(id, req.body, { new: true })

        return res
            .status(200)
            .json({
                status: "success",
                updateCategory,

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


const deleteCategory = async (req, res) => {
    try {

        const { id } = req.params

        const deletedCategory = await Category.findByIdAndDelete(id)

        return res
            .status(200)
            .json({
                status: "success",
                deletedCategory,

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
    createCategory,
    getCategoryById,
    getAllCategories,
    updateCategory,
    deleteCategory
}