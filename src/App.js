import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import HomePage from "./HomePage/HomePage";
import LoginPage from "./LoginPage/LoginPage";
import AboutPage from "./AboutPage/AboutPage";
import Menu from "./Menu/Menu";
import Hero from "./Hero/Hero";
import Footer from "./Footer/Footer";

import "./App.css";

function App() {
  return (
    <Router>
      <Menu />
      <Hero />
      <div className="mainContent">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
      {/* <HomePage /> */}
      <Footer />
    </Router>
  );
}

export default App;
