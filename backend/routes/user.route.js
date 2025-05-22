import express from 'express'
import { deleteUser, getUser, getUsers, updateUser, savePost, profilePosts,getNotificationNumber } from '../controllers/user.controller.js'
import {verifyToken} from "../middleware/verifyToken.js"

const router = express.Router()

router.get("/",getUsers) //for users
//router.get("/search/:id",verifyToken,getUser) //for specific user
router.put("/:id",verifyToken,updateUser) //to update a user, we need to be verified 1st
router.delete("/:id",verifyToken,deleteUser)
router.post("/save",verifyToken,savePost)
router.get("/profilePosts",verifyToken,profilePosts)
router.get("/notification",verifyToken,getNotificationNumber)

export default router