import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    items: [{
        item: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
        quantity: { type: Number, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        specialInstructions: String,
        total: { type: Number, required: true },
    }],
    status: { type: String, default: 'Pending' },
});

export default mongoose.model('Order', orderSchema);
