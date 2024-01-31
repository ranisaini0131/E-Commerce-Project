import { Router } from "express";
import { createCategory, getCategoryById, getAllCategories, updateCategory, deleteCategory } from "../controllers/category.controller.js";

const route = Router()

route.post("/createCategory", createCategory)
route.get("/getCategoryById/:id", getCategoryById)
route.get("/getAllCategories/:id", getAllCategories)
route.patch("/updateCategory/:id", updateCategory)
route.delete("/deletedCategory/:id", deleteCategory)



export default route;