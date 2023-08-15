import React from "react";
import Calendar from "./calendar/Calendar";
import Navbar from "./Navbar";
import Stats from "./Stats";

export default function Home() {
  return (
    <div className="Home">
        <Navbar/>
        <Calendar/>
        <Stats/>
    </div>
  );
}