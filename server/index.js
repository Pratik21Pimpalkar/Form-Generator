import express from "express";
import morgan from "morgan";
import  dotenv from 'dotenv';
import router from "./Routes/Route.js";
import Connection from "./DB.js";
import cors from 'cors'

dotenv.config();
const app=express();

const PORT = process.env.PORT || 8000;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

app.use(cors())
app.use(morgan("dev"))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router)
app.listen(PORT,()=>{
    console.log(`Server is running of PORT : ${PORT}`)
});
Connection(username, password);