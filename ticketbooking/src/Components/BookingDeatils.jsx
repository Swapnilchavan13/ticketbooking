import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const BookingDetails = () => {
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [mobileNumber, setMobileNumber] = useState('');
  const [isMobileNumberValid, setIsMobileNumberValid] = useState(false); // Add state for mobile number validity
  const [tid, setTid] = useState('');
  
  useEffect(() => {
    // Retrieve data from localStorage
    const storedData = JSON.parse(localStorage.getItem('bookingData') || '{}');
    setSelectedSeats(storedData.selectedSeats || []);
    setTotalAmount(storedData.totalAmount || 0);

    // Retrieve booked seats from localStorage
    const storedBookedSeats = JSON.parse(localStorage.getItem('bookedSeats') || '[]');
    setBookedSeats(storedBookedSeats);
  },[]);

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

  const handlePayment = async () => {
    if (!isMobileNumberValid) {
      alert('Please enter a valid mobile number.');
      return;
    }
  
    // Check if the selected date is Friday
    const selectedDate = new Date(localStorage.getItem('selectedDate'));
    if (selectedDate.getDay() !== 5) { // 5 corresponds to Friday (0 is Sunday, 1 is Monday, and so on)
      alert('You can only book tickets for Friday.');
      return;
    }
  
    // Extract the day from the selectedDate
    const day = selectedDate.toLocaleDateString('en-US', { weekday: 'lowercase' });
  
    try {
      // Send a POST request to your backend with the selected date
      await axios.post(`http://62.72.59.146:5000/seats/${day}`, {
        selectedSeats,
      });
  
      // Handle payment logic here (e.g., redirect to a payment gateway).
  
      alert('Tickets Booked');
      navigate('/notification');
    } catch (error) {
      console.error('Error booking tickets:', error);
      alert('Failed to book tickets. Please try again later.');
    }
  };
  
  

  return (
    <div className="booking-details">
      <h2>Booking Details</h2>
      <div>
        <h3>Movie Name: Jawan</h3>
        <h4>
          Selected  Seats:{' '}
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
      <h2>Scan And Pay The Amount</h2>
      <img className='qr' src={"qrcode.jpg"} alt="img" />
      <br />
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
      <h4 htmlFor="mobileNumber">Enter UPI Ref Number</h4>
      <input placeholder='Enter 12 Digit UPI Ref No.' onChange={(e) => setTid(e.target.value)} value={tid} type="number" /><br />
      <br />
      <button onClick={handlePayment} disabled={!isMobileNumberValid}>
        Enter UPI Reference Number
      </button>
    </div>
  );
};
