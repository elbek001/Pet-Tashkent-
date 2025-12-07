import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// Home components
import Hero from "./components/home/Hero";
import About from "./components/home/About";
import Adopt from "./components/home/Adopt";
import Clinck from "./components/home/Clinck";
import Donat from "./components/home/Donat";
import DonateNow from "./components/home/DonateNow";
import Home from "./components/home/Home";

// Styles
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        
        <Routes>
          {/* Home Page - Main Landing */}
          <Route path="/" element={<Home />} />
          
          {/* About Page */}
          <Route path="/about" element={<About />} />
          
          {/* Adopt/Find Animals Page */}
          <Route path="/adopt" element={<Adopt />} />
          
          {/* Veterinary Clinics Page */}
          <Route path="/clinics" element={<Clinck />} />
          
          {/* Donate Page */}
          <Route path="/donate" element={<Donat />} />
          
          {/* Donate Now - Payment Page */}
          <Route path="/donate-now" element={<DonateNow />} />
          
          {/* Hero Section - Can be a standalone page or part of home */}
          <Route path="/hero" element={<Hero />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;