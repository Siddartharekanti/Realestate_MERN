import express from "express";
import { shouldBeAdmin, shouldBeLoggedIn } from "../controllers/test.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/should-be-logged-in", verifyToken, shouldBeLoggedIn);
//here when we make req to this endpoint, it 1st runs the middleware(verifyToken),then if success it shouldbelogedin 


router.get("/should-be-admin", shouldBeAdmin);

export default router;