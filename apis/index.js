import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute.js';
import authRouter from './routes/authRoutes.js';
import cors from 'cors'

dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('MongoDB connected');
}).catch((err)=>{
    console.error(err);
});

const app = express();
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.use(express.json());
app.listen(3000, ()=>{
    console.log("your port is working on " + 3000)
})

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use((err,req,res,next)=>{
 const statusCode = err.statusCode || 500;
 const message = err.message || "Internal server error";
 return res.status(statusCode).json({
    success: false,
    statusCode,
    message
 })
})