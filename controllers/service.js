import Rider from '../models/Riders.js';

export const rider = async (req, res) => {
  try {
    // Fetch available riders from the database that are available
    const riders = await Rider.find({ available: true });
    res.status(200).json({ status: 'success', riders });
  } catch (err) {
    console.error('Error fetching riders', err);
    res.status(500).json({ error: 'Error fetching riders' });
  }
};

export const createRide = async (req, res) => {};

export const getRides = async (req, res) => {};
