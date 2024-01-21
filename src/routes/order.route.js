import { Router } from "express"
import { createOrder } from "../controllers/order.controller.js"

const router = Router()

router.post("/newOrder", createOrder)



export default router