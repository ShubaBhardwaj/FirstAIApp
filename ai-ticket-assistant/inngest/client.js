import { Inngest } from "inngest";
import dotenv from "dotenv"

dotenv.config()

export const inngest = new Inngest({
    id: "ticketing-assistant",
    eventKey: process.env.INGGEST_EVENT_KEY 

})