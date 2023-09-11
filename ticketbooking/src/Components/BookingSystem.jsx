import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './All.css';

const Seat = ({ seatNumber, isSelected, isBooked, onSelect }) => {
  const seatClassName = isSelected ? 'seat selected' : isBooked ? 'seat booked' : 'seat';

  const handleClick = () => {
    if (!isBooked) {
      onSelect(seatNumber);
    }
  };

  return (
    <div className={seatClassName} onClick={handleClick}>
      {seatNumber}
    </div>
  );
};

export const BookingSystem = () => {
  const seatPrice = 100; // Price per seat
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  const calculateTotalPrice = () => {
    return selectedSeats.length * seatPrice;
  };

  // Load previously selected seats from localStorage on component mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('bookingData') || '{}');
    setSelectedSeats(storedData.selectedSeats || []);
  }, []);

  // Load booked seats from localStorage on component mount
  useEffect(() => {
    const storedBookedSeats = JSON.parse(localStorage.getItem('bookedSeats') || '[]');
    setBookedSeats(storedBookedSeats);
  }, []);

  // Update localStorage whenever selected seats change
  useEffect(() => {
    const dataToStore = {
      selectedSeats,
      totalAmount: calculateTotalPrice(),
    };
    localStorage.setItem('bookingData', JSON.stringify(dataToStore));
  }, [selectedSeats]);

  const handleSeatSelect = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  return (
    <div className="booking-system">
      <img src="https://mir-s3-cdn-cf.behance.net/projects/404/301949145315591.Y3JvcCwzNjczLDI4NzIsMzE4LDU4MQ.jpg" alt="" />
      <h2 className="screen">Screen</h2><br />
      <h2>Movie Name : Jawan</h2><br />
      <div className="seats">
        {[...Array(26).keys()].map((seatNumber) => (
          <Seat
            key={seatNumber}
            seatNumber={seatNumber + 1}
            isSelected={selectedSeats.includes(seatNumber + 1)}
            isBooked={bookedSeats.includes(seatNumber + 1)}
            onSelect={handleSeatSelect}
            price={seatPrice}
          />
        ))}
      </div>
      <div>
        <label htmlFor="">Booked Seats</label>
        <div className='book'></div>
        <label htmlFor="">Available Seats</label>
        <div className='available'></div>
      </div>
      <div className="selected-seats">
        <h3>Selected Seats: {selectedSeats.join(', ')}</h3>
        <h3>Total Price: Rs.{calculateTotalPrice()}</h3>
      </div>
      <Link to="/details">
        <button>Book Tickets</button>
      </Link>
    </div>
  );
};
