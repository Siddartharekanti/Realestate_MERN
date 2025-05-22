import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import prisma from "../lib/prisma.js"

//register
export const register = async (req, res) => {
    const { username, email, password } = req.body

    try {
        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log(hashedPassword)

        //create new user and save it to DB
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

        console.log(newUser)
        res.status(201).json({ message: "user created successfully" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "failed to create user" })
    }
}


//login
export const login = async (req, res) => {
    const { username, password } = req.body
    try {
        //check if user exists in DB
        const user = await prisma.user.findUnique({
            where: { username },
        })

        if (!user) return res.status(400).json({ message: "Invalid Credentials" })

        //check if password is crt
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) return res.status(400).json({ message: "Invalid Credentials!" });

        //generate cookie token and send it to the user
        const age = 7 * 24 * 60 * 60 * 1000 // for 1 week(7 days)
        
        const token = jwt.sign({  
            id: user.id,
            isAdmin:false, //if user is an admin
        }, process.env.JWT_SECRET_KEY, {expiresIn: age}) //this token is valid only for 1 week

        const {password: userPassword, ...userInfo} = user //except password, all userInfo is stored from user

        res.cookie("token",token,{
            httpOnly:true,
            //secure:true,  -->only if our connection is https (we dont use becoz ours is localhost)
            maxAge:age
        }).status(200).json(userInfo) //{message:"Login Successful"}

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "failed to login!" })
    }
}

//logout
export const logout = (req, res) => {
   res.clearCookie("token").status(200).json({message:"Logout Successful"})
}