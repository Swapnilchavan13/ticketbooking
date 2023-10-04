import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
  const movie = ["https://m.media-amazon.com/images/M/MV5BMmI4ZGNlYjEtNGNlNS00YjEyLTlmZGYtY2Y4MDUxMWEyMDYzXkEyXkFqcGdeQXVyMTUyNjIwMDEw._V1_.jpg",
"https://upload.wikimedia.org/wikipedia/en/3/39/Jawan_film_poster.jpg"]
  const navigate = useNavigate();
  const seatPrice = 100; // Price per seat
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  const calculateTotalPrice = () => {
    return selectedSeats.length * seatPrice;
  };

  // Function to fetch booked seats from the API
  const fetchBookedSeatsFromAPI = async () => {
    try {
      const response = await axios.get('http://62.72.59.146:5000/booked-seats');
      const data = response.data;
      setBookedSeats(data.bookedSeats);
    } catch (error) {
      console.error('Failed to fetch booked seats from the API:', error);
    }
  };

  // Call the function to fetch booked seats from the API on component mount
  useEffect(() => {
    fetchBookedSeatsFromAPI();
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

  const BookTicket = () => {
    // Only navigate to details if at least one seat is selected
    if (selectedSeats.length > 0) {
      navigate('/details');
    }
  };

  return (
    <div className="booking-system">
      <img src={movie[1]} width={"300px"} alt="" />
      <h2 className="screen">Screen</h2>
      <h2>Movie Name: Jawan</h2>
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
      <button onClick={BookTicket} disabled={selectedSeats.length === 0}>
        Book Tickets
      </button>
    </div>
  );
};
