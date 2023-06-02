import Driver from '../models/Drivers.js';
import Ride from '../models/Rides.js';
import User from '../models/Users.js';

export const getDrivers = async (req, res) => {
  try {
    // Fetch drivers from the database that are currently available
    const drivers = await Driver.find({ available: true });
    res.status(200).json({ status: 'success', drivers });
  } catch (err) {
    console.error('Error fetching drivers', err);
    res.status(500).json({ message: err.message });
  }
};

export const createRide = async (req, res) => {
  try {
    const { userId, driverId, distance, duration, cost } = req.body;

    // Create a new ride in the database
    const ride = await Ride.create({
      passenger: userId,
      driver: driverId,
      distance,
      duration,
      cost,
      date: new Date().toISOString().split('T')[0],
    });
    res.status(201).json(ride);
  } catch (err) {
    console.error('Error creating ride', err);
    res.status(500).json({ message: err.message });
  }
};

export const getRides = async (req, res) => {
  const { userId } = req.body;

  try {
    // Fetch user's past rides from the database
    const rides = await Ride.find({ passenger: userId });

    if (!rides) {
      return res.status(404).json({ error: 'No ride history found' });
    }
    res.status(201).json(rides);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
