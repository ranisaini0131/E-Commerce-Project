import { Router } from "express";
import { uploads } from "../middlewares/multer.middleware.js";
import { SendOTP, changePassword, loginUser, logoutUser, registerUser, verifyOTP } from "../controllers/auth.controller.js";
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
router.post("/sendOtp", SendOTP)
router.post("/verifyOTP", verifyOTP)


//secured Routes

router.post("/logout", verifyJWT, logoutUser)
router.patch("/changePassword", verifyJWT, changePassword)


export default router;