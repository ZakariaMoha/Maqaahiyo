import Reservation from '../models/Reservation.js';

export const createReservation = async (req, res) => {
    try {
        // Log the incoming request body
        console.log('Incoming Data:', req.body);

        // Extract data from the request body
        const { name, email, phone, date, time, guests } = req.body;

        // Validate all required fields
        if (!name || !email || !phone || !date || !time || !guests) {
            console.error('Validation Error: Missing required fields');
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Log data before saving
        console.log('Data to be saved:', { name, email, phone, date, time, guests });

        // Create a new reservation instance
        const reservation = new Reservation({
            name,
            email,
            phone,
            date: new Date(date), // Ensure the date is stored as a valid Date object
            time,
            guests,
        });

        // Save the reservation to the database
        const savedReservation = await reservation.save();

        // Log the saved reservation
        console.log('Saved Reservation:', savedReservation);

        // Respond with the saved reservation
        res.status(201).json(savedReservation);
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({
            message: 'Error creating reservation',
            error: error.message,
        });
    }
};

export const getReservations = async (req, res) => {
    try {
        // Fetch reservations from the database
        const reservations = await Reservation.find();
        // Respond with the reservations
        res.status(200).json(reservations);
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).json({
            message: 'Error fetching reservations',
            error: error.message,
        });
    }
};
