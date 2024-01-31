import { Router } from "express"
import { isAdmin } from "../middlewares/isAdmin.middleware.js"
import { createProduct, deleteProductById, getAllProducts, getProductById, updateProduct, filteredProducts } from "../controllers/product.controller.js"

const router = Router()

router.post("/createProduct", createProduct)
router.get("/getProductById/:id", isAdmin, getProductById)
router.get("/getAllProducts/:id", isAdmin, getAllProducts)
router.get("/filteredProduct/:key", isAdmin, filteredProducts)
router.patch("/updatedProduct", isAdmin, updateProduct)
router.delete("/deleteProduct/:id", isAdmin, deleteProductById)







export default router;