import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { authroute } from './routes/userAuth.js';
import { adminRoute } from './routes/adminTasks.js';
import errorHandler from './middlewares/errorHandler.js';
const app = express();
config();
app.use(express.json());
app.use(cors());
app.use('/auth',authroute);
app.use('/users',adminRoute);
app.use(errorHandler);
app.use(express.urlencoded({ extended : true }));
console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));
app.get('/',(req,res)=>{res.send("<h1>Hey You</h1>")})
app.listen(process.env.PORT,()=>{
    console.log("Server Running on ",process.env.PORT);
})