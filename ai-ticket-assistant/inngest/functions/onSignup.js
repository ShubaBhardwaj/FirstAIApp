import { sendMail } from "../../utils/mailer.js"
import {inngest} from "../client.js"
import User from "../../models/user.js"
import { NonRetriableError } from "inngest"

export const onSignup = inngest.createFunction(
    {id: "user-sign-up", retries: 2},
    {event: "app/userSingup"},
    async({event, step})=>{
        try {
            const email = event.data.email

            // pipline 1
            const user = await step.run("get-user-email", async()=>{
                const userObject = await User.findOne({email})
                if (!userObject) {
                    throw new NonRetriableError("User faild to signup")
                }
                return userObject;
            })

            // pipline 2
            await step.run("send-signup-email", async()=>{
                const subject = `welcome to have you`
                const body = `Hi ${user.name},
                \n\n
                    Welcome to ticketing we're excited to have you on board!
                    You've successfully signed up, and your journey with us begins now. Whether you're here to`
                await sendMail(user.email, subject, body)
            })

            return {success: true}

        } catch (error) {
            console.error("Error running the step", error.message)
            return {success: false}
        }
    }


)
