import React, { useState } from 'react';
import axios from 'axios';

export const Notification = () => {
  const [phoneNumber, setPhoneNumber] = useState('+91');
  const [message, setMessage] = useState('');

  const handleSendSMS = () => {
    axios
      .post('http://localhost:5000/api/send-sms', { to: phoneNumber, body: message })
      .then((response) => {
        if (response.data.success) {
          alert('SMS sent successfully');
        } else {
          alert('Failed to send SMS');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('An error occurred while sending the SMS');
      });
  };

  return (
    <div>
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
      <label>
        Message:
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleSendSMS}>Send SMS</button>
    </div>
  );
}

