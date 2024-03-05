export const isAdmin = async (req, res, next) => {
    try {
        if (req.user.role === "admin") {
            return res.status(200).json({
                success: true,
                message: "Admin Verified !!"
            })
        }
        next()
    } catch (error) {
        console.log(error)
    }
}

