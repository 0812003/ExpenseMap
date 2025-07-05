import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoute.js';
import userRouter from './routes/userRoute.js';
import passport from 'passport';
import './config/passport.js';
import expenseRouter from './routes/expenseRoute.js';


const app = express();
const port = process.env.PORT || 4000;
const allowedOrigins = ['http://localhost:5173']
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins, credentials:true}));
connectDB();


app.get("/",(req,res)=>{
    res.send("API Working;")
})
app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);
app.use('/api/expense', expenseRouter);
app.use(passport.initialize());

app.listen(port,()=>{
    console.log(`Server is Listing on ${port}`);
})


