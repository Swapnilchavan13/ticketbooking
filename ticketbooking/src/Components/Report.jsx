import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const Report = () => {

    const [bookedseatslength, setBookedseatslength] = useState(0)

     // Function to fetch booked seats from the API
  const fetchBookedSeatsFromAPI = async () => {
    try {
      const response = await axios.get('http://62.72.59.146:5000/booked-seats');
      const data = response.data;
      console.log(data.bookedSeats.length)
      setBookedseatslength(data.bookedSeats.length);
    } catch (error) {
      console.error('Failed to fetch booked seats from the API:', error);
    }
  };

  // Call the function to fetch booked seats from the API on component mount
  useEffect(() => {
    fetchBookedSeatsFromAPI();
  }, []);


  return (
    <div>
        <h1>CINEMASS CINEMA, HATPIPLIYA</h1>
        <div style={{ padding:'40px',border:"1px solid black", margin:"auto", width:"60%", textAlign:'left'}}>
            <h3>DISTRIBUTOR : - MARUDHAR CINE ENTERTAINMENT LLP</h3>
            <h3>MOVIE       : - JAWAN</h3>
            <h3>PERIOD      : - </h3>
            <h3>WEEK        : - </h3>
        </div>

        <div style={{padding:'20px'}}>
        <table>
      <thead>
        <tr>
          <th>DATE</th>
          <th>SHOW</th>
          <th>AUDIENCE</th>
          <th>COLLECTIONS</th>
          <th>DEDUCTIONS</th>
          <th>EXPS</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2023-10-03</td>
          <td>1</td>
          <td>{bookedseatslength}</td>
          <td>Rs. {bookedseatslength*100}</td>
          <td>Rs. 0</td>
          <td>Rs. 0</td>
        </tr>
        <tr>
          <td>2023-10-04</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
        <td>2023-10-05</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
        <td>2023-10-06</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
        <td>2023-10-07</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
        <td>2023-10-08</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
        <td>2023-10-09</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr> 
        <th>Total</th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>      
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
  )
}
