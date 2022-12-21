import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';
import PostRoute from './Routes/PostRoute.js';
import UploadRoute from './Routes/UploadRoute.js';

// Routes
const app = express(); /* first instance of our server*/

// Middleware
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors())

dotenv.config();

// connect to db
mongoose
    .connect(process.env.MONGO_DB,{useNewUrlParser:true, useUnifiedTopology: true})
    .then(()=>app.listen(process.env.PORT,()=>console.log("Listening")))
    .catch((error)=> console.log(error));

// usage of routes
app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/post', PostRoute);
app.use('/upload', UploadRoute);