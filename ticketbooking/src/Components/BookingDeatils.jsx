import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const BookingDetails = () => {
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [mobileNumber, setMobileNumber] = useState('');
  const [isMobileNumberValid, setIsMobileNumberValid] = useState(false); // Add state for mobile number validity

  useEffect(() => {
    // Retrieve data from localStorage
    const storedData = JSON.parse(localStorage.getItem('bookingData') || '{}');
    setSelectedSeats(storedData.selectedSeats || []);
    setTotalAmount(storedData.totalAmount || 0);

    // Retrieve booked seats from localStorage
    const storedBookedSeats = JSON.parse(localStorage.getItem('bookedSeats') || '[]');
    setBookedSeats(storedBookedSeats);
  });

  // Function to check if a seat is booked
  const isSeatBooked = (seatNumber) => {
    return bookedSeats.includes(seatNumber);
  };

  // Function to validate the mobile number
  const validateMobileNumber = (number) => {
    // Add your mobile number validation logic here
    // For example, check if it's a 10-digit number
    return /^\d{10}$/.test(number);
  };

  // Handle changes in the mobile number input
  const handleMobileNumberChange = (e) => {
    const newMobileNumber = e.target.value;
    setMobileNumber(newMobileNumber);
    setIsMobileNumberValid(validateMobileNumber(newMobileNumber));
  };

  const handlePayment = () => {
    if (!isMobileNumberValid) {
      alert('Please enter a valid mobile number.');
    }

    // Handle payment logic here (e.g., redirect to a payment gateway).

    // Update booked seats in localStorage
    const updatedBookedSeats = [...bookedSeats, ...selectedSeats];
    localStorage.setItem('bookedSeats', JSON.stringify(updatedBookedSeats));

    alert('Tickets Booked');
    navigate('/notification');
  };

  return (
    <div className="booking-details">
      <h2>Booking Details</h2>
      <div>
        <h4 htmlFor="mobileNumber">Mobile Number</h4>
        <input
          type="tel"
          placeholder="Enter Mobile Number"
          name="mobileNumber"
          id="mobileNumber"
          value={mobileNumber}
          onChange={handleMobileNumberChange}
          required
        />
        <h3>Movie Name: Jawan</h3>
        <h4>
          Selected Seats:{' '}
          {selectedSeats.map((seatNumber) => (
            <span
              key={seatNumber}
              className={isSeatBooked(seatNumber) ? 'booked-seat' : ''}
            >
              {seatNumber},
            </span>
          ))}
        </h4>
        <h3>Total Amount: Rs.{totalAmount}</h3>
      </div>
      <button onClick={handlePayment} disabled={!isMobileNumberValid}>
        Proceed to Payment
      </button>
    </div>
  );
};
