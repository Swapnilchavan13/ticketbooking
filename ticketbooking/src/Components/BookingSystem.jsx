
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
  const moviename = ["Tiger 3", "Jawan"];
  const movie = ["https://m.media-amazon.com/images/M/MV5BMmI4ZGNlYjEtNGNlNS00YjEyLTlmZGYtY2Y4MDUxMWEyMDYzXkEyXkFqcGdeQXVyMTUyNjIwMDEw._V1_.jpg",
    "https://upload.wikimedia.org/wikipedia/en/3/39/Jawan_film_poster.jpg"];

  const navigate = useNavigate();
  const seatPrice = 100;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [bookedSeats, setBookedSeats] = useState([]);
  const [isFriday, setIsFriday] = useState(false); // Add state variable to track if it's Friday

  const calculateTotalPrice = () => {
    return selectedSeats.length * seatPrice;
  };

  // Function to fetch booked seats for the selected day
  const fetchBookedSeatsForSelectedDay = async () => {
    try {
      const response = await axios.get(`http://62.72.59.146:5000/seats/${selectedDate}`);
      const data = response.data;
      setBookedSeats(data);
    } catch (error) {
      console.error('Failed to fetch booked seats for the selected day:', error);
    }
  };

  // Call the function to fetch booked seats whenever selectedDate changes
  useEffect(() => {
    fetchBookedSeatsForSelectedDay();
  }, [selectedDate]);

    // Update localStorage whenever selected seats or date change
    useEffect(() => {
      const dataToStore = {
        selectedSeats,
        selectedDate,
        totalAmount: calculateTotalPrice(),
      };
      localStorage.setItem('bookingData', JSON.stringify(dataToStore));
    }, [selectedSeats, selectedDate]);
  
    // Check if the selected date is a Friday
    useEffect(() => {
      if (selectedDate) {
        const date = new Date(selectedDate);
        setIsFriday(date.getDay() === 5); // 5 represents Friday
      }
      localStorage.setItem('selectedDate', JSON.stringify(selectedDate))
    }, [selectedDate]);
    // console.log(selectedDate)
  
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
      };
    }

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className="booking-system">
      <img src={movie[1]} width={"300px"} alt="" />
      <h2 className="screen">Screen</h2>
      <h2>Movie Name: {moviename[1]}</h2>

      {/* Date selector */}
      <div>
        <label htmlFor="datePicker">Select a Date:</label>
        <input
          type="date"
          id="datePicker"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>

      {/* Display selected date and day of the week */}
      {selectedDate && (
        <div>
          <p>Selected Date: {selectedDate}</p>
          <h4>Day: {new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long" })}</h4>
        </div>
      )}

      {/* Conditionally display booked seats or all seats as available */}
      <div className="seats">
        {[...Array(26).keys()].map((seatNumber) => (
          <Seat
            key={seatNumber}
            seatNumber={seatNumber + 1}
            isSelected={selectedSeats.includes(seatNumber + 1)}
            isBooked={isFriday ? bookedSeats.includes(seatNumber + 1) : false}
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
