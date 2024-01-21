import { Router } from "express"
import { createProduct, deleteProductById, getAllProducts, getProductById, updateProduct } from "../controllers/product.controller.js"

const router = Router()

router.post("/createProduct", createProduct)
router.get("/getProductById/:id", getProductById)
router.get("/getAllProducts", getAllProducts)
router.patch("/updatedProduct", updateProduct)
router.delete("/deleteProduct/:id", deleteProductById)







export default router;