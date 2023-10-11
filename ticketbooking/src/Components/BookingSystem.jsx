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
  const moviename = ["MISSION RANIGANJ", "Fukrey 3"]
  const movie = ["https://www.jagranimages.com/images/newimg/06092023/06_09_2023-mission_raniganj_23523460.webp","https://cdn.dnaindia.com/sites/default/files/styles/full/public/2023/06/13/2594649-dna.jpg?im=Resize=(640,360)"]
  const navigate = useNavigate();
  const seatPrice = 100;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedDate, setSelectedDate] = useState( new Date().toISOString().slice(0, 10)); // Add selected date state variable
  const [mobilenum, setMobilenum] = useState(null);
  const [inx, setInx] = useState(0)
  
 /////////show time///////
//  const [selectedShowTime, setSelectedShowTime] = useState('defaultTime');
const [selectedShowTime, setSelectedShowTime] = useState(null);
 const [showTimes, setShowTimes] = useState([
   { value: "9 AM", tm:9, label: "9:00 AM" },
   { value: "12 PM", tm:12, label: "12:00 PM" },
   { value: "3 PM", tm:15, label: "3:00 PM" },
   { value: "6 PM", tm:18, label: "6:00 PM" },
   { value: "9 PM", tm:21,label: "9:00 PM" },
 ]);

  // Find the first non-disabled show time value
  const firstNonDisabledShowTime = showTimes.find((time) => !time.disabled);
  // console.log(firstNonDisabledShowTime.value)

 useEffect(() => {

  // console.log()
  // console.log(selectedDate)
  setSelectedShowTime(firstNonDisabledShowTime.value)

  // Check if the selected date matches the current date
  if (
    selectedDate ===
    new Date().toISOString().slice(0, 10)
  ) {
    // Disable the radio buttons for show times that have already passed
    const updatedShowTimes = showTimes.map((time) => {
      const showTime = new Date();
      const currentTime = showTime.getHours();
      time.disabled = time.tm <= currentTime;
      return time;
    });

    setShowTimes(updatedShowTimes);
  } else {
    // If the dates don't match, reset the disabled flag for all show times
    const updatedShowTimes = showTimes.map((time) => {
      time.disabled = false;
      return time;
    });

    setShowTimes(updatedShowTimes);
  }

 }, [firstNonDisabledShowTime,selectedDate]);

  // Set selectedShowTime to the value of the first non-disabled show time, or null if none are available

 const handleShowTimeChange = (event) => {
  const newShowTime = event.target.value;
  setSelectedShowTime(newShowTime);

  // Call the function to fetch booked seats based on the selected showtime
  fetchBookedSeatsFromAPI(dayy, newShowTime);
};

 /////////  

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

const fetchBookedSeatsFromAPI = async (dayy, selectedShowTime) => {
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

      // Filter booked seats based on the selected showtime
      const bookedSeatNumbers = data.bookedSeats
        .filter((seat) => seat.showTime === selectedShowTime)
        .map((seat) => seat.seatNumber);

      // Update the state with booked seats
      setBookedSeats(bookedSeatNumbers);
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
    fetchBookedSeatsFromAPI(dayy, selectedShowTime);
  }, [selectedDate, selectedShowTime]);


  const calculateTotalPrice = () => {
    return selectedSeats.length * seatPrice;
  };

  // Update localStorage whenever selected seats or date change
  useEffect(() => {
    const dataToStore = {
      selectedSeats,
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

    localStorage.setItem('mobilenum', JSON.stringify(mobilenum));

    if(mobilenum){
      if (selectedShowTime) {
        // Save the selected show time in local storage
        localStorage.setItem("selectedShowTime", selectedShowTime);
        // You can also display a confirmation message or perform other actions here
        alert(`Selected show time: ${selectedShowTime}`);
      } else {
        // Handle the case where no show time is selected
        alert("Please select a show time");
      }
      if (selectedSeats.length > 0) {
        navigate('/details');
      }
    }
    else{
      alert("Please Enter Mobile Number")
    } 
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const currentDate = new Date();
    const selectedDateObj = new Date(selectedDate);
    const sevenDaysAhead = new Date();
    sevenDaysAhead.setDate(currentDate.getDate() + 6);

    if(selectedDate > "2023-10-13"){
      setInx(1)
    }
    else{
      setInx(0)
    }
  
    if (selectedDateObj >= currentDate && selectedDateObj <= sevenDaysAhead) {
      setSelectedDate(selectedDate);
    } else {
      alert("Please select a date within the next 7 days.");
    }
  };

    // Handle changes in the mobile number input
    const handleMobileNumberChange = (e) => {
      const newMobilenum = e.target.value;
      setMobilenum(newMobilenum);
    };
  
  const main= []
  for (let i = 0; i < selectedSeats.length; i++){
    if(selectedSeats[i]<=6){
      main.push("A"+selectedSeats[i])
    }
    else if(selectedSeats[i]>6 && selectedSeats[i]<14){
      main.push("B"+selectedSeats[i])
    }
    else{
      main.push("C"+selectedSeats[i])
    }
  }

  return (
    <div className="booking-system">
      <img style={{borderRadius:'20px'}} src={"logogif.gif"} alt="" />
      <br />
      <img src="https://media.istockphoto.com/id/1300788021/vector/box-office-banner-alphabet-sign-marquee-light-bulb-vintage.jpg?s=612x612&w=0&k=20&c=E3RA9XDcx4K9vALeIpL6fF2wqRolNRIBXyi6NNywYko=" alt="" />
      <br />
      <img src={movie[inx]} width={"700px"} alt="" />
      <h2 className="screen">Screen</h2>
      <h2 className='moviename'>Movie Name: {moviename[inx]}</h2>    

      <div className='seatindication'>
        <label htmlFor="">Booked Seats</label>
        <div className='book'></div>
        <label htmlFor="">Available Seats</label>
        <div className='available'></div>
      </div>
      <br />

<div className="seats">
  <div className="column">
    <h3>A</h3>
    {[...Array(6).keys()].map((seatNumber) => (
      <Seat
        id='seat'
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
  <div id='c3' className="column">
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
  <div>
    <label className='datePicker'>Mobile Number :- </label>
    <input
        className='inputmob'
          type="tel"
          placeholder="Enter Mobile Number"
          name="mobileNumber"
          id="mobileNumber"
          onChange={handleMobileNumberChange}
          value={mobilenum}
          required
        />
  </div><br />

<div className='selectdate'>
<div className='selectdateinput'>
      <label htmlFor="datePicker">Select Date :-</label>
        <input
          type="date"
          id="datePicker"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      {/* {selectedDate && (
        <div className='selectetime'>
          <h4>Selected Date</h4>
          <h5>{selectedDate}</h5>
          <h4>Day: {new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long" })}</h4>
        </div>
      )} */}
</div>


<div className='selectshow'>
      <h4>Select Show :-</h4>
      <div className='show'>
      {showTimes.map((time) => (
        <div className='showtime' key={time.value}>
          <input
            type="radio"
            name="showTime"
            value={time.value}
            checked={selectedShowTime === time.value}
            onChange={handleShowTimeChange}
            disabled={time.disabled}
          />
          <label>{time.label}</label>
        </div>
      ))}
      </div>
    </div>
    </div>

      <div className="selected-seats">
        <h3>Selection :</h3>
        <div className='select'>
        <button>{selectedShowTime}</button>
        <button>{main.join(', ')}</button>
        <button>{new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long" })}</button>
        <button>Rs.{calculateTotalPrice()}</button>
        </div>
      </div>
      <br />
      <button className='bookbutton' onClick={BookTicket} disabled={selectedSeats.length === 0}>
        Book Tickets
      </button>
    </div>
  );
};
