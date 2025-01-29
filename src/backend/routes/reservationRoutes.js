import express from 'express';
const router = express.Router();
import { createReservation, getReservations } from '../controllers/reservationController.js';

router.post('/', createReservation);
router.get('/', getReservations);
router.get('/reservations', getReservations);

export default router;
