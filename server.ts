import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDb from './config/db.ts';
import userRouter from './src/routes/userRoute.ts';
import cors from 'cors';
import postRouter from './src/routes/PostRoute.ts';

const app = express()

const port=process.env.PORT || 3000

//mmiddleswares
dotenv.config()

connectDb()
app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended:true}));
app.use(morgan('tiny'));

//routes
app.use('/api/v1/auth/', userRouter);
app.use('/api/v1/post/', postRouter)
app.get('/', (req, res) => {
    res.send("Hello Typescript");
})


app.listen(port || 3000, () => {
    console.log(`Server Running on port:${port} `);
})