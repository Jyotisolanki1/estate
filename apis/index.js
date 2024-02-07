import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute.js';

dotenv.config()


mongoose.connect(process.env.MONGO).then(()=>{
    console.log('MongoDB connected');
}).catch((err)=>{
 console.error(err);
});

const app = express();
app.listen(3000, ()=>{
    console.log("your port is working on " + 3000)
})

app.use('/api/user', userRouter)