import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import userRoutes from "./routers/user.js"
import ticketRoutes from "./routers/ticket.js"
import { serve } from "inngest/express"
import { inngest } from "./inngest/client.js"
import { onSignup } from "./inngest/functions/onSignup.js"
import { onticketCreated } from "./inngest/functions/onTicketCreation.js"

dotenv.config()


const PORT = process.env.PORT || 3000
const mongoose_url = process.env.MONGO_URL
const app = express()
app.use(cors()) // Its like a middleware which helps in the connecting with the frontend 
app.use(express.json()) // This for accepting the json data

app.use("/api/auth", userRoutes);
app.use("/api/tickets", ticketRoutes);

app.use(
    "api/innges",
    serve({
        client: inngest,
        functions: [onSignup, onticketCreated]
    })
);

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
