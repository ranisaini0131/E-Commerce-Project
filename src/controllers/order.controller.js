import { Order } from "../models/order.model.js"
// import { User } from "../models/user.model.js"
// import { Product } from "../models/product.model.js"

const createOrder = async (req, res) => {
    try {

        const { user, orderItem, totalAmount } = req.body

        if (!(user || orderItem || totalAmount)) {
            return res
                .status(500)
                .json({
                    status: "failed",
                    message: "provide all required details."
                })
        }

        const existedOrder = await Order.findOne({ user }).populate("User").populate("Product")

        if (existedOrder) {
            return res
                .status(500)
                .json({
                    status: "failed",
                    message: "Order already Created"
                })
        }

        const newOrder = new Order({
            user,
            orderItem,
            totalAmount
        })

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
        const orderedItems = await Order.find({ user: user }).populate('User').populate('Product');
        res.send({
            status: "success",
            message: orderedItems
        })

    } catch (error) {
        console.log(error)
        res.send({
            status: "failed",
            message: error.message
        })
    }
}


const getAllOrders = async (req, res) => {

}

const CancelOrder = async (req, res) => {

}

const updateOrder = async (req, res) => {

}

// export async function deleteOrder(req, res) {
//     const { id } = req.params
//     try {
//         const order = await Order.findByIdAndDelete(id)

//         if (order) {
//             res.send({
//                 status: 'success',
//                 message: order
//             })
//         } else {
//             res.send({
//                 status: 'failed',
//                 message: "order doesn't deleted"
//             })
//         }

//     } catch (error) {
//         console.log(error)
//     }
// }


// export async function updateOrder(req, res) {
//     const { id } = req.params
//     try {
//         const order = await Order.findByIdAndUpdate(id, req.body, { new: true })

//         if (order) {
//             res.send({
//                 status: 'success',
//                 message: order
//             })
//         } else {
//             res.send({
//                 status: 'failed',
//                 message: "order doesn't updated"
//             })
//         }

//     } catch (error) {
//         console.log(error)
//     }
// }


export {
    createOrder,
    getOrderById,
    getAllOrders,
    updateOrder,
    CancelOrder
}