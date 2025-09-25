import React from "react";
import Navbar from "./Navbar";
import Feature from "./Feature";
import About from "./About";
import Footer from "./Footer";
import Navbar002 from "./Navbar002";
import HowItWorks from "./Howwork";

const Home = () => {
  return (
    <div>
      <Navbar002 />
      <Feature />
      <HowItWorks />
      <About />
    </div>
  );
};

export default Home;
