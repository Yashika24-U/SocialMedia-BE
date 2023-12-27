import express from "express"
import {login} from "../controllers/auth.js"

// creating a route
const router = express.Router();


router.post("/login",login)



export default router;