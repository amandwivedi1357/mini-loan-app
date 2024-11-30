import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import loanRoutes from './routes/loanRoutes.js';
import { apiLimiter } from './middleware/rateLimiter.js';

dotenv.config();

const app = express();


app.use(helmet());
app.use(cors());
app.use(express.json());


app.use(apiLimiter);

app.get('/',(req,res)=>{
  res.json({  message: 'Welcome to the mini loan app API'
  })
  })

app.use('/api/auth', authRoutes);
app.use('/api/loans', loanRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});


connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});