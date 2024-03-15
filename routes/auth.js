import express, { Router } from "express";

import validateBody from "../helpers/validateBody.js";

import {
    register,
    login,
} from "../controllers/authControllers.js";

import {
    registerShema,
    loginShema
} from "../schemas/usersShemas.js";


const authRouter = express.Router();

authRouter.post("/register", validateBody(registerShema), register)

authRouter.post("/login", validateBody(loginShema), login)

export default authRouter;