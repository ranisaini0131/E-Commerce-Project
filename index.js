import dotenv from 'dotenv'
import express from "express"
const app = express()

const port = 5000

dotenv.config({
    path: './env'
})

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${port}`)
})
