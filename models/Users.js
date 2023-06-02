import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const { Schema } = mongoose;

const userSchema = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    trim: true,
    lowercase: true,
  },
  firstName: {
    type: String,
    trim: true,
    lowercase: true,
  },
  lastName: {
    type: String,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  country: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    min: 8,
    max: 64,
  },
  avatar: {
    type: String,
    default: '/avatar.png',
  },
  accountLock: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: 'live',
  },
  createdAt: {
    type: String,
  },
});

userSchema.methods.comparePassword = async function (password) {
  const result = bcrypt.compareSync(password, this.password);
  return result;
};

export default mongoose.model('User', userSchema);
