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

// app.use(async (req, res, next) => {
//   const { method, url, body  } = req;
//   const date = moment().format("DD-MM-YYYY_HH:mm:ss");
//   let data
//   if (method === 'GET'  && Object.keys(req.query).length === 0 ||method === 'DELETE') {
//     data = '';
//   } else {
//     data = JSON.stringify(body);
//   }
//   const parts = url.split('/');
//   const id = parts[parts.length - 1];
//     const action =
//     method === 'POST' ? 'Added' :
//     method === 'PUT' ? `Changed, ID: ${id}` :
//     method === 'DELETE' ? `Deleted, ID: ${id}` :
//     method === 'GET' ? (id ? `GET CONTACTS ID: ${id}` : 'ALL CONTACTS') : ''
//   await fs.promises.appendFile(
//     "./public/server.log",
//     ` \n \n${date}, \n ${method}, ${url}, \n ${action}  ${data ? `, ${data}` : ''} `
//   );
//   next();
// });


app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

// app.listen(3000, () => {
//   console.log("Server is running. Use our API on port: 3001");
// });