import { Order } from "../models/order.model.js"
// import { User } from "../models/user.model.js"
// import { Product } from "../models/product.model.js"

//M
const createOrder = async (req, res) => {
    try {
        // get user id via jwt token
        const { orderItems } = req.body

        if (!Array.isArray(orderItems) || !orderItems.length) {
            return res
                .status(400)
                .json({
                    status: false,
                    message: "Please provide orderItems!"
                })
        }

        const existedOrder = await Order.findOne({ orderItem })

        if (existedOrder) {
            return res
                .status(500)
                .json({
                    status: "failed",
                    message: "Order already Created"
                })
        }

        const newOrder = new Order({
            orderItems,
            totalAmount,
        }).populate("user").populate("product").exec()

        await newOrder.save()

        return res
            .status(200)
            .json({
                status: "success",
                message: "Order Created successfully",
                data: newOrder
            })

    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json({
                status: "failed",
                message: error.message
            })
    }
}


const getOrderById = async (req, res) => {
    try {
        const { user } = req.query
        const orderedItems = await Order.find({ user: user })
        // .populate('User').populate('Product');

        return res
            .status(200)
            .json({
                status: "success",
                data: orderedItems
            })

    } catch (error) {
        console.log(error)

        return res
            .status(200)
            .json({
                status: "failed",
                message: error.message
            })
    }
}


const getAllOrders = async (req, res) => {
    try {

        const allOrders = Order.find()

        return res
            .status(200)
            .json({
                status: "success",
                message: "All Orders",
                allOrders
            })


    } catch (error) {
        console.log(error)
        return res
            .status(200)
            .json({
                status: "failed",
                messgae: error.message,
            })
    }
}


//M
const canceledOrder = async (req, res) => {

}

const updateOrder = async (req, res) => {
    const { id } = req.params
    try {
        const order = await Order.findByIdAndUpdate(id, req.body, { new: true })

        if (order) {
            res.send({
                status: 'success',
                message: order
            })
        } else {
            res.send({
                status: 'failed',
                message: "order doesn't updated"
            })
        }

    } catch (error) {
        console.log(error)
    }
}




export {
    createOrder,
    getOrderById,
    getAllOrders,
    updateOrder,
    canceledOrder
}