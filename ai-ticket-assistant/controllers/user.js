import brcypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/user.js"
import {inngest} from "../inngest/client.js"

export const signup = async(req, res)=>{
    const {email , name , password, role, skills = []} = req.body;
    try {
        const hashed = brcypt.hash(password,10)
        const user = User.create({name, email, password: hashed, role, skills})

        // Fire Inngest Event
        await inngest.send({
            name: "app/userSingup",
            data:{
                email,
            }
        })

        const token = jwt.sign(
            {_id: user.id, role: user.role}, process.env.JWT_SECRET
        );

        res.json({user, token})

    } catch (error) {
        res.status(500).json({error:"signup Failed", details: error.message})
    }
}

export const login = async(req, res)=>{
    const{ email, password } = req.body

    try {
        const user = User.findOne({email})
        if(!user) return res.status(404).json({error:"Login Failed User not found"})
        
        const isMatch = await brcypt.compare(password, user.password);

        if(!isMatch) return res.status(401).json({error: "Invalid Credentials"})

        const token = jwt.sign(
            {_id: user.id, role: user.role}, process.env.JWT_SECRET
        );

        res.json({user, token})

    } catch (error) {
        res.status(500).json({error:"login Failed", details: error.message})
    }
}

export const logOut = async(req, res)=>{
    try {
        const token = req.headers.authorization.split(" ")[1]
        if(!token) return res.status(401).json({error: "Unauthorized"})
        jwt.verify(token, process.env.JWT_SECRET, (err,decoded)=>{
                            if(err) return res.status(401).json({error: "Unauthorized"})})
        res.json({message: "Logout Succesfully"})
    } catch (error) {
        res.status(500).json({error:"logout Failed", details: error.message})
    }
}

export const updateUser = async()=>{
    const {email, role, skills = []} = req.body
    try {
        if(req.user?.role !== "admin"){
            return res.status(403).json({erro: "Forbidden"})
        }
        const user = await User.findOne({email})
        if(!user) return res.status(401).json({error: "User not found"});
        await User.updateOne(
            {email},
            {skills: skills.length ? skills : user.skills, role}
        )
        return res.json({message: "User upadted successfully"})
    } catch (error) {
       res.status(500).json({error:"Update Failed", details: error.message}) 
    }
}

export const getUser = async()=>{
    try {
        if(req.user.role !== "admin"){
            return res.status(403).json({error: "Forbidden"})
        }
        const users = User.find().select("-passward")
        return res.json(users)
    } catch (error) {
        res.status(500).json({error:"Get User Failed", details: error.message})
    }
}