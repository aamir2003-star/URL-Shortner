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

const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
if (process.env.CLIENT_URL) {
  const clientUrls = process.env.CLIENT_URL.includes(',')
    ? process.env.CLIENT_URL.split(',')
    : [process.env.CLIENT_URL];

  clientUrls.forEach(url => {
    let formattedUrl = url.trim();
    if (formattedUrl.endsWith('/')) {
      formattedUrl = formattedUrl.slice(0, -1);
    }
    allowedOrigins.push(formattedUrl);
  });
}

app.use(
  cors({
    origin: allowedOrigins,
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
