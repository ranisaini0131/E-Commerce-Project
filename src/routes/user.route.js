import { Router } from "express";
import { uploads } from "../middlewares/multer.middleware.js";
import { loginUser, logoutUser, registerUser } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/verifyUser.middleware.js";

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

router.post("/login", loginUser)


//secured Routes

router.post("/logout", verifyJWT, logoutUser)


export default router;