import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [drivers, setDrivers] = useState([]);
  const [passengerName, setPassengerName] = useState('');
  const [bookingConfirmation, setBookingConfirmation] = useState(null);
  const [error, setError] = useState('');

  // Fetch available drivers on load
  const fetchDrivers = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/drivers');
      const data = await response.json();
      setDrivers(data);
    } catch (err) {
      console.error("Failed to fetch drivers", err);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  // Handle the booking request
  const handleBooking = async (e) => {
    e.preventDefault();
    setError('');

    if (!passengerName.trim()) {
      setError('Please enter your name.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passengerName: passengerName }),
      });

      if (!response.ok) {
        throw new Error('Failed to book a ride. No drivers available?');
      }

      const confirmationData = await response.json();
      setBookingConfirmation(confirmationData);
      setPassengerName('');
      fetchDrivers(); // Refresh driver list to show updated availability

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>NextGen Ride Booking</h1>

      {/* Booking Form Section */}
      <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc' }}>
        <h2>Book a Ride</h2>
        <form onSubmit={handleBooking}>
          <input 
            type="text" 
            placeholder="Enter Passenger Name" 
            value={passengerName}
            onChange={(e) => setPassengerName(e.target.value)}
            style={{ padding: '8px', marginRight: '10px' }}
          />
          <button type="submit" style={{ padding: '8px 15px', cursor: 'pointer' }}>
            Request Ride
          </button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      {/* Confirmation Section */}
      {bookingConfirmation && (
        <div style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#d4edda', border: '1px solid #c3e6cb' }}>
          <h2>Booking Confirmed!</h2>
          <p><strong>Booking ID:</strong> {bookingConfirmation.id}</p>
          <p><strong>Passenger:</strong> {bookingConfirmation.passengerName}</p>
          <p><strong>Assigned Driver:</strong> {bookingConfirmation.driver.name}</p>
          <p><strong>Vehicle:</strong> {bookingConfirmation.driver.vehicleDetails}</p>
        </div>
      )}

      {/* Available Drivers Section */}
      <div>
        <h2>Available Drivers Online ({drivers.length})</h2>
        {drivers.length === 0 ? (
          <p>No drivers currently available.</p>
        ) : (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {drivers.map((driver) => (
              <li key={driver.id} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                <strong>{driver.name}</strong> - {driver.vehicleDetails}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;