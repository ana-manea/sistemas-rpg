import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import authRoutes from './routes/auth.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import pdfRoutes from './routes/pdf.routes.js';
import sheetsRoutes from './routes/sheets.routes.js';
import usersRoutes from './routes/users.routes.js';

dotenv.config();
await connectDB();

const app = express();
const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(express.json({ limit: '2mb' }));

app.get('/', (req, res) => res.json({ message: 'API Arquivo de RPG online.' }));
app.use('/api/auth', authRoutes);
app.use('/api/characters', sheetsRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/pdf', pdfRoutes);
app.use('/api/users', usersRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
