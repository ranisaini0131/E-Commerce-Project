import { Router } from "express"
import { createBrand, getAllBrands, getBrandById, updateBrand, deleteBrand } from "../controllers/brand.controller.js"

const route = Router()

route.post("/createBrand", createBrand)
route.get("/getBrandById", getBrandById)
route.get("/getAllBrands", getAllBrands)
route.patch("/updateBrand", updateBrand)
route.delete("/deleteBrand", deleteBrand)


export default route;