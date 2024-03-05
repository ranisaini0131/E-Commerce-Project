import { Router } from "express"
import { isAdmin } from "../middlewares/isAdmin.middleware.js"
import { verifyJWT } from "../middlewares/verifyUser.middleware.js"
import { uploads } from "../middlewares/multer.middleware.js"
import { createProduct, deleteProductById, getAllProducts, getProductById, updateProduct, filteredProducts } from "../controllers/product.controller.js"

const router = Router()

router.post("/createProduct", verifyJWT, isAdmin, uploads.array("avatar", 10), createProduct)
router.get("/getProductById/:id", verifyJWT, isAdmin, getProductById)
router.get("/getAllProducts/:id", verifyJWT, isAdmin, getAllProducts)
router.get("/filteredProduct/:key", filteredProducts)
router.patch("/updatedProduct", verifyJWT, isAdmin, updateProduct)
router.delete("/deleteProduct/:id", verifyJWT, isAdmin, deleteProductById)







export default router;