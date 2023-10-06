import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import logovideo from '../Components'
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
  const moviename = ["Tiger 3", "MISSION RANIGANJ"];
  const movie = ["https://m.media-amazon.com/images/M/MV5BMmI4ZGNlYjEtNGNlNS00YjEyLTlmZGYtY2Y4MDUxMWEyMDYzXkEyXkFqcGdeQXVyMTUyNjIwMDEw._V1_.jpg",
    "https://www.jagranimages.com/images/newimg/06092023/06_09_2023-mission_raniganj_23523460.webp"];

  const navigate = useNavigate();
  const seatPrice = 100;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedDate, setSelectedDate] = useState( new Date().toISOString().slice(0, 10)); // Add selected date state variable

  const apiget = [
    'http://62.72.59.146:8000/booked-monday',
    'http://62.72.59.146:8000/booked-tuesday',
    'http://62.72.59.146:8000/booked-wednesday',
    'http://62.72.59.146:8000/booked-thursday',
    'http://62.72.59.146:8000/booked-friday',
    'http://62.72.59.146:8000/booked-saturday',
    'http://62.72.59.146:8000/booked-sunday'
  ];
  

 // Function to fetch booked seats from the API based on the selected day
var dayy = new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
// console.log(dayy);

const fetchBookedSeatsFromAPI = async (dayy) => {
  try {
    // Determine the index corresponding to the selected day
    const dayToIndex = {
      monday: 0,
      tuesday: 1,
      wednesday: 2,
      thursday: 3,
      friday: 4,
      saturday: 5,
      sunday: 6
    };

    if (dayToIndex.hasOwnProperty(dayy)) {
      const index = dayToIndex[dayy];
      const response = await axios.get(apiget[index]);
      const data = response.data;
      setBookedSeats(data.bookedSeats);
    } else {
      alert('Invalid day selected.');
    }
  } catch (error) {
    console.error('Failed to fetch booked seats from the API:', error);
  }
};
  // Call the function to fetch booked seats from the API on component mount
  useEffect(() => {
    // Replace 'selectedDay' with the actual selected day from your state
    fetchBookedSeatsFromAPI(dayy);
  }, [selectedDate]);


  const calculateTotalPrice = () => {
    return selectedSeats.length * seatPrice;
  };

  // Update localStorage whenever selected seats or date change
  useEffect(() => {
    const dataToStore = {
      selectedSeats,
      // selectedDate, // Include selectedDate in localStorage
      totalAmount: calculateTotalPrice(),
    };
    localStorage.setItem('selectedDate', JSON.stringify(selectedDate))
    localStorage.setItem('bookingData', JSON.stringify(dataToStore));

  }, [selectedSeats]); // Listen to selectedSeats and selectedDate

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

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const currentDate = new Date();
    const selectedDateObj = new Date(selectedDate);
    const sevenDaysAhead = new Date();
    sevenDaysAhead.setDate(currentDate.getDate() + 6);
  
    if (selectedDateObj >= currentDate && selectedDateObj <= sevenDaysAhead) {
      setSelectedDate(selectedDate);
    } else {
      alert("Please select a date within the next 7 days.");
      // setSelectedDate(currentDate);
      // You can choose to clear the input field or handle it as per your requirements
    }
  };
  

  return (
    <div className="booking-system">
      <img style={{borderRadius:'20px'}} src={"logogif.gif"} alt="" />
      <br />
      <img src="https://media.istockphoto.com/id/1300788021/vector/box-office-banner-alphabet-sign-marquee-light-bulb-vintage.jpg?s=612x612&w=0&k=20&c=E3RA9XDcx4K9vALeIpL6fF2wqRolNRIBXyi6NNywYko=" alt="" />
      <br />
      <img src={movie[1]} width={"700px"} alt="" />
      <h2 className="screen">Screen</h2>
      <h2>Movie Name: {moviename[1]}</h2>    


      <div className='seatindication'>
        <label htmlFor="">Booked Seats</label>
        <div className='book'></div>
        <label htmlFor="">Available Seats</label>
        <div className='available'></div>
      </div>

<div className="seats">
  <div className="column">
    <h3>A</h3>
    {[...Array(6).keys()].map((seatNumber) => (
      <Seat
        key={seatNumber}
        seatNumber={(seatNumber + 1)}
        isSelected={selectedSeats.includes(seatNumber + 1)}
        isBooked={bookedSeats.includes(seatNumber + 1)}
        onSelect={handleSeatSelect}
        price={seatPrice}
      />
    ))}
    <h3>A</h3>

  </div>
  <div className="column">
  <h3>B</h3>
    {[...Array(7).keys()].map((seatNumber) => (
      <Seat
        key={seatNumber}
        seatNumber={(seatNumber + 7)} // Start from 7
        isSelected={selectedSeats.includes(seatNumber + 7)}
        isBooked={bookedSeats.includes(seatNumber + 7)}
        onSelect={handleSeatSelect}
        price={seatPrice}
      />
    ))}
  <h3>B</h3>
  </div>
  <div className="column">
  <h3>C</h3>
    {[...Array(8).keys()].map((seatNumber) => (
      <Seat
        key={seatNumber}
        seatNumber={(seatNumber + 14)} // Start from 14
        isSelected={selectedSeats.includes(seatNumber + 14)}
        isBooked={bookedSeats.includes(seatNumber + 14)}
        onSelect={handleSeatSelect}
        price={seatPrice}
      />
    ))}
  <h3>C</h3>
  </div>
</div>
<br />

<div className='dateandshow'>

<div className='selectdate'>
<div>
      <h4 htmlFor="datePicker">Select a Date</h4>
        <input
          type="date"
          id="datePicker"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      {selectedDate && (
        <div>
          <h4>Selected Date</h4>
          <h5>{selectedDate}</h5>
          <h4>Day: {new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long" })}</h4>
        </div>
      )}

</div>
      <div className='selectshow'>
        <h4>Select Show Time</h4>
        <div className='showtime'>
        <input type="radio" />
        <label>9:00 Am</label>
        </div>
        <div className='showtime'>
        <input type="radio" />
        <label>12:00 Pm</label>
        </div>
        <div className='showtime'>
        <input type="radio" />
        <label>3:00 Pm</label>
        </div>
        <div className='showtime'>  
        <input type="radio" />
        <label>6:00 Pm</label>
        </div>
        <div className='showtime'>
        <input type="radio" />
        <label>9:00 Pm</label>
        </div>
      </div>
      
      </div>
      <div className="selected-seats">
        <h3>Selected Seats: {selectedSeats.join(', ')}</h3>
        <h3>Total Price: Rs.{calculateTotalPrice()}</h3>
      </div>
      <button className='bookbutton' onClick={BookTicket} disabled={selectedSeats.length === 0}>
        Book Tickets
      </button>
    </div>
  );
};
