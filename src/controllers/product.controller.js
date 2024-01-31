import { Product } from "../models/product.model.js";
import { Category } from "../models/category.model.js"

const createProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body

        if (!(name || description || price)) {
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

    // console.log(req.body, req.user, "102");
    //         let data = { ...req.body, userId: req.user._id }
    //         const add = new Address(data);
    //         await add.save()//Address me save
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

//M
const filteredProducts = async (req, res) => {
    try {


        console.log(req.params, "77")

        const sortOptions = req.query.sort ? { [req.query.sort]: req.query.order === 'desc' ? -1 : 1 } : {};

        const filteredProducts = await Product.find(
            {
                $or: [
                    { name: { $regex: req.params.key } },
                    { title: { $regex: req.params.key } },
                    { price: { $regex: req.params.key } },
                    { category: { $regex: req.params.key } },
                    { brand: { $regex: req.params.key } },
                ]
            }
        )
            .sort(sortOptions)
            .limit(req.query.limit ? parseInt(req.query.limit) : 0) // Limit the number of results
            .skip((req.query.page ? parseInt(req.query.page) : 1) - 1) // Skip records for pagination
            .exec();


        return res
            .status(200)
            .json({
                status: "success",
                filteredProducts
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

