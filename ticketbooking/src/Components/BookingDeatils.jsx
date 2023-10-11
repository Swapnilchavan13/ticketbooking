import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const BookingDetails = () => {
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [mobileNumber, setMobileNumber] = useState('');
  const [isMobileNumberValid, setIsMobileNumberValid] = useState(false); // Add state for mobile number validity
  const [tid, setTid] = useState('');
  const [selecteddate, setselecteDate]= useState()
  const [showTime, setsSelectedshow] =useState('')
  const [mobNum, setMobnum] = useState('')
  
  const [bookedSeats, setBookedSeats] = useState([]);
  useEffect(() => {
    // Retrieve data from localStorage
    const storedData = JSON.parse(localStorage.getItem('bookingData') || '{}');
    setselecteDate(storedData.selectedDate || '')
    setSelectedSeats(storedData.selectedSeats || []);
    setTotalAmount(storedData.totalAmount || 0);

    const selectedtime = localStorage.getItem('selectedShowTime')
    setsSelectedshow(selectedtime)

    const num= localStorage.getItem('mobilenum')
    setMobnum(num)

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
  
    const selectedDate = new Date(localStorage.getItem('selectedDate'));
    const day = selectedDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

    // Define an array of API URLs for each day
    const apiarr = [
      'http://62.72.59.146:8000/book-monday',
      'http://62.72.59.146:8000/book-tuesday',
      'http://62.72.59.146:8000/book-wednesday',
      'http://62.72.59.146:8000/book-thursday',
      'http://62.72.59.146:8000/book-friday',
      'http://62.72.59.146:8000/book-saturday',
      'http://62.72.59.146:8000/book-sunday'
    ];
  
    // Define a mapping of day names to their corresponding index
    const dayToIndex = {
      monday: 0,
      tuesday: 1,
      wednesday: 2,
      thursday: 3,
      friday: 4,
      saturday: 5,
      sunday: 6
    };
  
    // Check if the selected day is in the dayToIndex mapping
    if (dayToIndex.hasOwnProperty(day)) {
      const index = dayToIndex[day];
      
      try {
        // Send a POST request to the backend using the selected URL
        const response = await axios.post(apiarr[index], {
          selectedSeats,
          showTime,
          mobNum
        });
      
        if (response.data.success) {
          // Booking was successful
          alert('Tickets Booked');
          navigate('/notification');
        } else {
          // Tickets are already booked
          alert(response.data.message);
          navigate('/')
        }
      } catch (error) {
        console.error('Error booking tickets:', error);
        alert('Failed to book tickets. Please try again later.');
      }
      
    } else {
      alert('Invalid day selected.');
    }
  };

  return (
    <div className="booking-details">
      <h2>Booking Details</h2>
      <div>
        <h3>Movie Name: Mission Raniganj</h3>
        <h4>
          Selected Seats:{' '}
          {selectedSeats.sort((a, b) => a - b).map((seatNumber) => (
            <span
              key={seatNumber}
              className={isSeatBooked(seatNumber) ? 'booked-seat' : ''}
            >
              {seatNumber},
            </span>
          ))}
        </h4>
        <h4>Show Time: {showTime}</h4>
        <h3>Total Amount: Rs.{totalAmount}</h3>
      </div>
      <h2>Scan And Pay The Amount</h2>
      <img className='qr' src={"qrcode.jpg"} alt="img" />
      <br />
      <h4 htmlFor="mobileNumber">Mobile Number</h4>
        <input
        className='inputmob'
          type="tel"
          placeholder="Enter Mobile Number"
          name="mobileNumber"
          id="mobileNumber"
          value={mobileNumber}
          onChange={handleMobileNumberChange}
          required
        />
      {/* <h4 htmlFor="mobileNumber">Enter UPI Ref Number</h4>
      <input className='inputmob' placeholder='Enter 12 Digit UPI Ref No.' onChange={(e) => setTid(e.target.value)} value={tid} type="number" /><br />
      <br /> */}
      {/* <button onClick={handlePayment} disabled={!isMobileNumberValid}>
        Enter UPI Reference Number
      </button> */}
    </div>
  );
};