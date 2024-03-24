import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";


import contactsRouter from "./routes/contactsRouter.js";
import authRouter from "./routes/authRouter.js";

import mongoose from "mongoose";





dotenv.config();
const { DB_HOSTS, PORT = 3000 } = process.env;

const app = express();

mongoose
  .connect(DB_HOSTS)
  .then(() => {
    app.listen(PORT, () => console.log("Database connection successfu"));
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

app.use(morgan("tiny"));
app.use(express.json());



app.use("/api/users", authRouter)
app.use("/api/contacts", contactsRouter);
app.use(express.static("public"));

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});



export default app;