import {Router} from "express";
import { createUser } from "../services/user.js";


const router = new Router()

router.post('/create', createUser)


export {router as userRoutes}