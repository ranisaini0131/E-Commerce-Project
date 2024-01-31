import { Router } from "express"
import { createOrder, updateOrder, canceledOrder, getOrderById, getAllOrders } from "../controllers/order.controller.js"
import { verifyJWT } from "../middlewares/verifyUser.middleware.js"
import { isAdmin } from "../middlewares/isAdmin.middleware.js"

const router = Router()


router.post("/newOrder", verifyJWT, createOrder)
router.patch("/updateOrder", verifyJWT, updateOrder)
router.delete("/canceledOrder", verifyJWT, canceledOrder)

router.get("/getOrderById", isAdmin, getOrderById)
router.get("/getAllOrders", isAdmin, getAllOrders)



export default router