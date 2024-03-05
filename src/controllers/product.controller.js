import { Product } from "../models/product.model.js";

const createProduct = async (req, res) => {
    try {
        const { name, description, price, image } = req.body

        if (!(name && description && price && image)) {
            return res.status(400).json({
                status: "failed",
                message: "Please provide all fields",
            })
        }

        const existedPrduct = await Product.findOne({ name })

        if (existedPrduct) {
            return res
                .status(400)
                .json({
                    status: "failed",
                    message: "Product already exists"
                })
        }

        const newProduct = new Product(req.body);
        await newProduct.save()

        return res
            .status(200)
            .json({
                status: "success",
                data: newProduct
            })

    } catch (error) {
        return res
            .status(500)
            .json({
                status: "success",
                message: error.message
            })
    }
}

const getProductById = async (req, res) => {
    try {
        const { id } = req.params

        const product = await Product.findById(id);

        return res
            .status(200)
            .json({
                status: "success",
                product: product
            })

    } catch (error) {
        return res
            .status(500)
            .json({
                status: "failed",
                mssage: "product not found"
            })
    }
}

const getAllProducts = async (req, res) => {
    try {

        const allProducts = await Product.find();



        return res
            .status(200)
            .json({
                status: "success",
                product: allProducts
            })

    } catch (error) {

        return res
            .status(500)
            .json({
                status: "failed",
                mssage: "product not found"
            })
    }
}


const filteredProducts = async (req, res) => {
    try {
        const { checked, radio } = req.body;

        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

        const products = await Product.find(args);
        return res
            .status(200)
            .json({
                status: "success",
                products
            })



    } catch (error) {
        console.log(error)
        return res
            .status(400)
            .json({
                mssage: "product not found",
                error
            })
    }
}


const updateProduct = async (req, res) => {
    try {
        const { id } = req.query

        const product = await Product.findByIdAndUpdate(id, req.body, { new: true })

        return res
            .status(200)
            .json({
                status: "success",
                updatedProduct: product
            })

    } catch (error) {
        return res
            .status(500)
            .json({
                status: "failed",
                message: "product not updated"
            })
    }
}

const deleteProductById = async (req, res) => {
    try {
        const { id } = req.params

        const product = await Product.findByIdAndDelete(id)

        return res
            .status(200)
            .json({
                status: "success",
                deletedProduct: product
            })


    } catch (error) {
        return res
            .status(500)
            .json({
                status: "failed",
                message: "product not deleted"
            })
    }
}




export {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProductById,
    filteredProducts
}

