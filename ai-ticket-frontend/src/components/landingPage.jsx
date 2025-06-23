import React from "react";
import Navbar from "./navbare";
import { Link, useNavigate } from "react-router-dom";


const LandingPage = () => {
  return (<>
  <Navbar/>
<div className="hero bg-base-200 min-h-screen">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-7xl font-bold">Hello there</h1>
      <p className="py-6">
        Resolve you doubt with our TA's with our AI powered chatbot and get your doubt resolved quickly and easily
      </p>
      {/* <button className="btn btn-primary">Get Started</button> */}
      <Link to="/signup" className="btn btn-primary">Signup</Link>
    </div>
  </div>
</div>
</>
  );
};

export default LandingPage;
