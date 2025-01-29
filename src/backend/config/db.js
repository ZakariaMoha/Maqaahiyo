console.log('MongoDB URI:', process.env.MONGODB_URI);
import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI; // Use environment variable
const port = process.env.PORT || 5000; // Use environment variable for port

const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

export default connectDB;
