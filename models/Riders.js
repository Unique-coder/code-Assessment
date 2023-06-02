import Mongoose from 'mongoose';
const { Schema } = Mongoose;

const riderSchema = new Schema({
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

export default Mongoose.model('Riders', riderSchema);
