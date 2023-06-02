import mongoose from 'mongoose';
const { Schema } = mongoose;

const rideSchema = new Schema({
  id: {
    type: String,
  },
  passenger: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Riders',
  },
  distance: {
    type: Number,
    trim: true,
  },
  duration: {
    type: Number,
    trim: true,
  },
  cost: {
    type: Number,
    trim: true,
  },
  date: {
    type: String,
  },
});

export default mongoose.model('Ride', rideSchema);
