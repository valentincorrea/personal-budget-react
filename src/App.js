import logo from "./logo.svg";
import React from "react";
import HomePage from "./HomePage/HomePage";
import Menu from "./Menu/Menu";
import Hero from "./Hero/Hero";
import Footer from "./Footer/Footer";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Menu />
      <Hero />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
