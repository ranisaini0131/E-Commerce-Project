import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: true,
    credentials: true
}))

app.use(express.json({ limit: "160kb" }))

app.use(express.urlencoded({ extended: true, limit: "16kb" }))

app.use(express.static("public"))

app.use(cookieParser())


//import routes
import userRouter from "./routes/user.route.js"
import productRouter from "./routes/products.route.js"
import orderRouter from "./routes/order.route.js"
import categoryRouter from "./routes/category.route.js"
import brandRouter from "./routes/brand.route.js"
import cartRouter from "./routes/cart.route.js"

app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/orders', orderRouter)
app.use('/api/v1/category', categoryRouter)
app.use('/api/v1/brand', brandRouter)
app.use("/api/v1/cart", cartRouter)








export { app }