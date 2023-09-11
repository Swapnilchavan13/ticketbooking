import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookingSystem } from './Components/BookingSystem';
import { BookingDetails } from './Components/BookingDeatils';


function App() {
  return (
    <div className="App">
      <h1>Ticket Booking System</h1>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookingSystem />} />
        <Route path="/details" element={<BookingDetails />}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
