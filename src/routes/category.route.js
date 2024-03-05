import { Router } from "express";
import { verifyJWT } from "../middlewares/verifyUser.middleware.js"
import { isAdmin } from "../middlewares/isAdmin.middleware.js"
import { createCategory, getCategoryById, getAllCategories, updateCategory, deleteCategory } from "../controllers/category.controller.js"
const route = Router()

route.post("/createCategory", verifyJWT, isAdmin, createCategory)
route.get("/getCategoryById/:id", verifyJWT, isAdmin, getCategoryById)
route.get("/getAllCategories/:id", verifyJWT, isAdmin, getAllCategories)
route.patch("/updateCategory/:id", verifyJWT, isAdmin, updateCategory)
route.delete("/deletedCategory/:id", verifyJWT, isAdmin, deleteCategory)



export default route;