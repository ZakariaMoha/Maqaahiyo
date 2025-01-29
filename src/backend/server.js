import 'dotenv/config';
import express from 'express';
import cors from 'cors'; // Import CORS
import connectDB from './config/db.js';
import menuRoutes from './routes/menuRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { createReservation } from './controllers/reservationController.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

console.log('Environment Variables:', process.env);

// Middleware
app.use(express.json());
app.use(cors()); // Use CORS

// Routes
app.use('/api/menu', menuRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/reservations', reservationRoutes);
app.post('/api/reservations', createReservation);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
