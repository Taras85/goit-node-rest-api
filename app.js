import fs from "fs";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from 'dotenv'

import contactsRouter from "./routes/contactsRouter.js";
import moment from "moment/moment.js";
import mongoose from 'mongoose';


dotenv.config();
// import { DB_HOSTS } from "./config.js";
const { DB_HOSTS,  PORT=3000 } = process.env;



const app = express();


mongoose.connect(DB_HOSTS)
  .then(() => {
      app.listen(PORT, () => console.log("Database connection successfu"));
    })
  .catch(error => {
    console.log(error.message)
    process.exit(1)
    } )




app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());




app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

