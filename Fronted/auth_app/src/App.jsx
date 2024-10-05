import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navabr'
import Loginpage from './components/Loginpage'
import Singup from './components/Singup';
import ExampleProfilePage from './components/ProfilePage';

const App = () => {
  return (
    <Router>
    <div>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/signup" element={<Singup />} />
        <Route path="/profile" element={<ExampleProfilePage />} />
      </Routes>
    </div>
  </Router>
  )
}

export default App
