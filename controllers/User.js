import User from '../models/Users.js';
import ResetToken from '../models/resetToken.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const salt = await bcrypt.genSalt(10);

// Used to handle error responses
import { sendError, randomBytes } from '../utils/helpers.js';

// Create a new car ride User
export const register = async (req, res) => {
  const { firstName, lastName, email, password, phone, country, state } =
    req.body;

  try {
    const validateUser = await User.findOne({ email }).exec();
    if (validateUser) {
      res.status(409);
      throw new Error('There is an account associated with this email already');
    }

    // User Info Verification $ Validation
    if (password && password.length < 8) {
      res.status(400);
      throw new Error('Password should be at least 8 characters');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save New User Details
    const user = new User({
      name: `${firstName} ${lastName}`,
      firstName: firstName,
      lastName: lastName,
      email,
      phoneNumber: phone,
      country,
      state,
      password: hashedPassword,
    });
    await user.save();

    res.status(200).json({
      status: 'success',
      message: '✅ New User Account created',
      user,
    });
  } catch (error) {
    res.status(400).json({ status: 'Failed', message: error.message });
  }
};

// Business can Login to their  account
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email && !password)
      return res.status(400).send('❗ Please fill in your details');
    if (!email) return res.status(400).send('❗ Email address is required');
    if (!password) return res.status(400).send('❗ Password is required');

    // User Verification
    const existingUser = await User.findOne({ email });

    // json response message if no such user.email is found
    if (!existingUser)
      return res.status(400).send("❌ This user doesn't exist");

    // check if user.password is correct with the existing password
    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    // json response message if password is incorrect
    if (!passwordMatch) return res.status(400).send('❌ Password is wrong');

    // Get jsonwebtoken and send to the frontend. Information to store in the token, + secret key string, + How long to stay logged in
    const accessToken = jwt.sign(
      {
        _id: existingUser._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );

    const { accountLock, firstName, lastName } = existingUser;

    res.status(201).json({
      accountLock,
      accessToken,
      _id: existingUser._id,
      name: `${firstName} ${lastName}`,
      email: existingUser.email,
      message: '✅ Successful Login',
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};
