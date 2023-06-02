import mongoose from 'mongoose';
const { Schema } = mongoose;

const driverSchema = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    trim: true,
    lowercase: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  car: {
    type: String,
    trim: true,
  },
  rating: {
    type: String,
    trim: true,
  },
  available: {
    type: Boolean,
  },
});

export default mongoose.model('driver', driverSchema);
