import express, { Router } from "express";

import validateBody from "../helpers/validateBody.js";

import {
    register,
    login,
    current,
    logout,
    updateUserSubscription,
} from "../controllers/authControllers.js";

import {
    registerShema,
    loginShema,
    updateUsertSubscriptionSchema
} from "../schemas/usersShemas.js";
import {authenticate} from "../helpers/authenticate.js"


const authRouter = express.Router();

authRouter.post("/register", validateBody(registerShema), register)

authRouter.post("/login", validateBody(loginShema), login)

authRouter.get("/current", authenticate, current)

authRouter.post("/logout", authenticate, logout)

authRouter.patch("/users", authenticate,validateBody(updateUsertSubscriptionSchema), updateUserSubscription)

export default authRouter;