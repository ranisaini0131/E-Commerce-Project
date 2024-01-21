import { Product } from "../models/product.model.js";

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

        const allProducts = await Product.find()

        return res
            .status(200)
            .json({
                status: "success",
                allProducts: allProducts
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
    deleteProductById
}




// export async function getAllProduct(req, res) {

//     //filter={"category": ["smartphone","laptops"]}
//     //sort={_sort:"price",_order="desc"}
//     //pagination={_page:1,_limit=10}

//     let query = Product.find({});
//     let totalProductsQuery = Product.find({});// for total products becoz same query ko hum count and total k liye use nhi kr skte

//     if (req.query.category) {
//         query = query.find({ category: req.query.category })
//         totalProductsQuery = totalProductsQuery.find({ category: req.query.category })
//     }

//     if (req.query.brand) {
//         query = query.find({ brand: req.query.brand })
//         totalProductsQuery = totalProductsQuery.find({ brand: req.query.brand })
//     }

//     //sort and order sath me chalte h dono hone chaiye
//     if (req.query._sort && req.query._order) {
//         query = query.sort({ [req.query._sort]: req.query._order })//title:order
//         totalProductsQuery = totalProductsQuery.sort({ [req.query._sort]: req.query._order })
//     }

//     //to find total products

//     const totalProducts = await totalProductsQuery.count().exec()
//     console.log({ totalProducts })


//     if (req.query._page && req.query._limit) {
//         const pageSize = req.query._limit;
//         const page = req.query._page
//         query = query.skip(pageSize * (page - 1)).limit(pageSize)//limit is means 1 page pr kitne products dikhana h
//     }

//     try {
//         const docs = await query.exec();
//         res.set('X-Total-Count', totalProducts)// not giving proper result becoz may be X-Total-Count' not defined
//         res.send({
//             status: 'success',
//             message: docs
//         })

//     } catch (error) {
//         console.log(error)

//     }


// }

