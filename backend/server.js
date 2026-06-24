import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import characterRoutes from './routes/characterRoutes.js';

dotenv.config();
await connectDB();

const app = express();
const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(express.json({ limit: '2mb' }));

app.get('/', (req, res) => res.json({ message: 'API Arquivo da Máscara online.' }));
app.use('/api/auth', authRoutes);
app.use('/api/characters', characterRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
