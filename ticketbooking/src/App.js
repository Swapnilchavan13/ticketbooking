import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookingSystem } from './Components/BookingSystem';
import { BookingDetails } from './Components/BookingDeatils';
import { Notification } from './Components/Notification';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookingSystem />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/details" element={<BookingDetails />}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
