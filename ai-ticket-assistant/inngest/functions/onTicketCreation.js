import { sendMail } from "../../utils/mailer.js"
import {inngest} from "../client.js"
import Ticket from "../../models/ticket.js"
import User from "../../models/user.js"
import { NonRetriableError } from "inngest"
import analyzTicket from "../../utils/AI.js"

export const onticketCreated = inngest.createFunction(
    {id: "ticket-created", retries: 2},
    {event: "app/ticketCreated"},
    async({event, step})=>{
        try {
            const {ticketId} = event.data

            const ticket = await step.run('fetching-ticket',async()=>{
               const ticketObject = Ticket.findById(ticketId) 
               if(!ticket){
                throw new NonRetriableError("Ticket not found")
               }
               return ticketObject
            });

            await step.run('update-ticket-status', async()=>{
                await Ticket.findByIdAndUpdate(ticket._id,{status: "TODO"})
            })

            const aiResponse = await analyzTicket(ticket)
            
            const relatedSkills = await step.run('ai-processing', async()=>{
                let skills = [];
                if(aiResponse){
                    await Ticket.findByIdAndUpdate(ticket._id,{
                        priority: !["low", "medium","high"].includes(aiResponse) ? "medium" : aiResponse.priority,
                        helpfulNotes: aiResponse.helpfulNotes,
                        status: "In_Progress",
                        relatedSkills: aiResponse.relatedSkills 
                    })
                skills = aiResponse.relatedSkills;    
                }
                return skills;
            })

            const moderater = await step.run('asigginig-moderater',async()=>{
                let user = User.findOne({
                    role: "moderater",
                    skills: {$elemMatch: {
                        $regex: relatedSkills.join("|"),
                        $options: "i"
                    },
                },
                });
                if(!user) {
                    user = await User.findOne({
                        role: "admin"
                    })
                }
                await Ticket.findByIdAndUpdate(ticket._id,{
                    assigniedTo: user?._id || null
                })
                return user;
            });

            await step.run('send-email-notification', async()=>{
                if(moderater){
                    const finalTicket = await Ticket.findById(ticket._id)
                    await sendMail(
                        moderater.email,
                        "Ticket Assigned",
                        `A new ticket is assigne to you ${finalTicket.title}`
                    )
                }
            })

            return {succes: true}
            
        } catch (error) {
            console.error("❌ Error running the step",error.message)
            return {succes: false}
        }
    }
)