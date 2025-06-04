import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()


const PORT = process.env.PORT || 3000
const mongoose_url = process.env.MONGO_URL
const app = express()
app.use(cors()) // Its like a middleware which helps in the connecting with the frontend 
app.use(express.json()) // This for accepting the json data

mongoose
       .connect(mongoose_url)
       .then(()=>{
        console.log("MongoDB Connected ✅");
        app.listen(PORT, ()=>{
            console.log(`Server is running at ${PORT}`)
        })
       })
       .catch((err)=>{
           console.log("Mongoose Error:",err)
       })
