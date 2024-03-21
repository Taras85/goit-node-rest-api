import express from "express";
import { upload } from "../middlewares/multer.js";

import validateBody from "../middlewares/validateBody.js";

import {
    register,
    login,
    current,
    logout,
    updateUserSubscription,
    updateUserAvatar,
} from "../controllers/authControllers.js";

import {
    registerShema,
    loginShema,
    updateUsertSubscriptionSchema
} from "../schemas/usersShemas.js";
import {authenticate} from "../middlewares/authenticate.js"


const authRouter = express.Router();

//upload.fields([{name:"avatarURL", maxCount:1},{name:"cover", maxCount: 2}]) файли з різих полів
//upload.fields("avatarURL", 8) файли з одного поля 8шт.
//upload.single("avatarURL") 1 файл

authRouter.post("/register", upload.single("avatarURL"), validateBody(registerShema), register)

authRouter.post("/login", validateBody(loginShema), login)

authRouter.get("/current", authenticate, current)

authRouter.post("/logout", authenticate, logout)

authRouter.patch("/users", authenticate, validateBody(updateUsertSubscriptionSchema), updateUserSubscription)

authRouter.patch("/avatar", authenticate, upload.single("avatarURL"), updateUserAvatar )

export default authRouter;