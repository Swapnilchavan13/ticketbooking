import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Notification = () => {
  const navigate = useNavigate()
  const [phoneNumber, setPhoneNumber] = useState('+91');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Retrieve data from localStorage
    const storedData = JSON.parse(localStorage.getItem('bookingData') || '{}');
    setSelectedSeats(storedData.selectedSeats || []);
    setTotalAmount(storedData.totalAmount || 0);

    // Retrieve booked seats from localStorage
    const storedBookedSeats = JSON.parse(localStorage.getItem('bookedSeats') || '[]');
    setBookedSeats(storedBookedSeats);
  }, []);

  // Function to check if a seat is booked
  const isSeatBooked = (seatNumber) => {
    return bookedSeats.includes(seatNumber);
  };

  // Generate the message with seat numbers and total amount
  useEffect(() => {
    const selectedSeatNumbers = selectedSeats.join(', '); // Convert selected seats to a comma-separated string
    setMessage(`Hello Sir/Madam,\n\nWe're excited to confirm your booking for the following seats: ${selectedSeatNumbers}\n\nYour total amount is Rs. ${totalAmount}.\n\nThank you for choosing CINEMASS!`);
  }, [selectedSeats, totalAmount]);

  const handleSendSMS = () => {

    alert(`Hello Sir/Madam, We're excited to confirm your booking for the following seats: ${selectedSeats} Your total amount is Rs. ${totalAmount}.Thank you for choosing CINEMASS!`)
    // axios
    //   .post('http://62.72.59.146:5000/send-sms', { to: phoneNumber, body: message })
    //   .then((response) => {
    //     if (response.data.success) {
    //       alert('Tickets sent successfully');
    //     } else {
    //       alert('Failed to send SMS');
    //     }
        navigate('/')
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     alert('An error occurred while sending the SMS');
    //   });
      
      
  };

  return (
    <div className='booking-details'>
      <h2>Ticket Confirmation</h2>
      <label>
        Phone Number:
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </label>
      <br />
      <br />
      <button onClick={handleSendSMS}>Send Confirm Tickets</button>
    </div>
  );
}