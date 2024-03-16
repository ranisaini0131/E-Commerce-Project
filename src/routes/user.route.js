import { Router } from "express";
import { uploads } from "../middlewares/multer.middleware.js";
import { changePassword, forgetPassword, loginUser, logoutUser, registerUser, verifyOTP } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/verifyUser.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js"
import { getAllUser, getUserById, updateProfilePicture, updateUser } from "../controllers/user.controller.js";

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
router.post("/forget-password", forgetPassword)
router.post("/verifyOTP", verifyOTP)


//secured Routes

router.post("/logout", verifyJWT, logoutUser)
router.patch("/changePassword", verifyJWT, changePassword)
router.get('/getuserById', isAdmin, getUserById)
router.get('/getAllUsers', isAdmin, getAllUser)
router.patch('/updateUser/:id', verifyJWT, updateUser)
router.patch("/updateProfilePicture/:_id",
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
    updateProfilePicture) //verifyJWT, lgana h

router.get("/user-auth", verifyJWT, (req, res) => {
    res.status(200).json({ ok: true });
})


export default router;