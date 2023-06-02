# Car Ride-Sharing App

This is a simple car ride-sharing app built with Node.js and Express.js. The app allows users to create rides, retrieve past rides.

The server will start running on `http://localhost:3000`.

## Endpoints

### Create a Ride

**Endpoint:** `POST /rides`

Creates a new ride.

**Request Body:**

```json
{
  "driver": "John",
  "passenger": "Jane",
  "distance": 10,
  "duration": 30,
  "cost": 15
}
```

### Retrieve Past Rides

**Endpoint:** `GET /rides`

Retrieves all past rides.
