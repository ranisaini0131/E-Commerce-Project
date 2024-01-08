import dotenv from 'dotenv'


dotenv.config({
    path: './env'
})

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${port}`)
})
