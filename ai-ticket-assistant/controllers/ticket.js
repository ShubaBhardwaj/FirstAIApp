import e from "cors"
import {inngest} from "../inngest/client.js"
import Ticket from "../models/ticket.js"

export const createTicket = async(req, res)=>{
    try {
        const {title, description} = req.body
        if(!title || !description){
            return res.status(400).json({message: "Title and description is missing please fill that, Both are requird"})
        }
        const newTicket = Ticket.create({
            title,
            description,
            createdBy: req.user._id.toString()
        })

        await inngest.send({
            name: "ticket/Created",
            data: {
                ticketId: (await newTicket)._id.toString(),
                title, 
                description,
                createdBy: req.user._id.toString()
            }
        });

        return res.status(201).json({message: "Ticket created and processing is stated",
            ticket: newTicket
        })

    } catch (error) {
        console.error("Error creating ticket",error.message);
        return res.status(500).json({message: "Internal Server Errro"});
    }
}

export const getTickets = async(req, res)=>{
    try {
        const user = req.user;
        let tickets = []
        if(user.role !== "user"){
            tickets = Ticket.find({})
            .populate("assigniedTo", ["email", "_id"])
            .sort({createdAt: -1})
        }else{
            tickets = await Ticket.find({createdBy: user._id})
                        .select("title description status createdAt")
                        .sort({createdAt: -1})
        }
        return res.status(200).json(tickets)
    } catch (error) {
        console.error("Error creating ticket",error.message);
        return res.status(500).json({message: "Internal Server Errro"});
    }
}

export const getTicket = async(req, res)=>{
    try {
        const user = req.user;
        let ticket;
        if (user.role ) {
            ticket = Ticket.findById(req.params.id)
            .populate("assigniedTo", ["email", "_id"])
        }else{
            ticket = Ticket.findOne({
                createdBy: user._id,
                _id: req.params.id
            }).select("title description status createdAt")
        }

        if(!ticket) return res.status(404).json({message: "Ticket not found"})
        return res.status(201).json(ticket)


    } catch (error) {
        console.error("Error in fetcing the ticket",error.message);
        return res.status(500).json({message: "Internal Server Errro"});
    }
}