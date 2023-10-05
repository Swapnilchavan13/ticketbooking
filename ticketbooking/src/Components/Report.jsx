import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const Report = () => {
  const [bookedSeatsData, setBookedSeatsData] = useState([]);
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  // Function to fetch booked seats data for a specific day
  const fetchBookedSeatsForDay = async (day) => {
    try {
      const response = await axios.get(`http://62.72.59.146:8000/booked-${day}`);
      const data = response.data;
      return data;
    } catch (error) {
      console.error(`Failed to fetch booked seats for ${day}:`, error);
      return null;
    }
  };

  // Call the function to fetch data for each day and store it in state
  useEffect(() => {
    const fetchDataForDays = async () => {
      const dataPromises = days.map((day) => fetchBookedSeatsForDay(day));
      const dataForDays = await Promise.all(dataPromises);
      setBookedSeatsData(dataForDays);
    };

    fetchDataForDays();
  }, [days]);


    // Calculate the total collection
    const totalCollection = bookedSeatsData.reduce((total, dayData) => {
      if (dayData) {
        const dayCollection = dayData.bookedSeats.length * 100;
        return total + dayCollection;
      }
      return total;
    }, 0);
  



  return (
    <div>
      <h1>CINEMASS CINEMA, HATPIPLIYA</h1>
        <div style={{ padding:'40px',border:"1px solid black", margin:"auto", width:"60%", textAlign:'left'}}>
            <h3>DISTRIBUTOR : - MARUDHAR CINE ENTERTAINMENT LLP</h3>
            <h3>MOVIE       : - MISSION RANIGANJ</h3>
            <h3>PERIOD      : - </h3>
            <h3>WEEK        : - </h3>
        </div>
      <div style={{ padding: '20px' }}>
        <table>
          <thead>
            <tr>
              <th>DAY</th>
              <th>SHOW</th>
              <th>AUDIENCE</th>
              <th>COLLECTIONS</th>
              <th>DEDUCTIONS</th>
              <th>EXPS</th>
            </tr>
          </thead>
          <tbody>
            {days.map((day, index) => (
              <tr key={day}>
                <td>{day.charAt(0).toUpperCase() + day.slice(1)}</td>
                <td>{index + 1}</td>
                {bookedSeatsData[index] ? (
                  <>
                    <td>{bookedSeatsData[index].bookedSeats.length}</td>
                    <td>Rs. {bookedSeatsData[index].bookedSeats.length * 100}</td>
                    <td>Rs. 0</td>
                    <td>Rs. 0</td>
                  </>
                ) : (
                  <>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </>
                )}
              </tr>
            ))}
            <tr>
              <th>Total</th>
              <td></td>
              <td></td>
              <td style={{fontWeight:"bold"}}>Rs. {totalCollection}</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <div>
    <tr> 
        <th>NET COLLECTION</th>
        <td>Rs.</td>
    </tr>
    <tr>
        <th>REP CHARGE</th>
        <td>Rs.</td>
    </tr>
    <tr>
        <th>SHOW TAX</th>
        <td>Rs.</td>
    </tr>
    <tr>
        <th>AFTER DEC</th>
        <td>Rs.</td>
    </tr>
    </div>
      </div>
    </div>
  );
};
