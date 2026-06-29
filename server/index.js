import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './src/config/db.js';
import urlRouter from './src/routes/url.routes.js';
import userRouter from './src/routes/user.routes.js';
import { redirectURL } from './src/controller/url.controller.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

connectDB();

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Server is running',
    timestamp: new Date(),
  });
});

app.use('/api/url', urlRouter);
app.use('/api/user', userRouter);

app.get('/r/:shortID', redirectURL);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
