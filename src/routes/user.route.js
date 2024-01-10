import { Router } from "express";
import { uploads } from "../middlewares/multer.middleware.js";
import { registerUser } from "../controllers/auth.controller.js";

const router = Router()

router.post('/register',
    uploads.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser)


export default router;