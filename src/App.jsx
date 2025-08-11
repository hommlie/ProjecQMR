import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LandingAnimation from "./components/LandingAnimation";
import HomeScreen from "./components/HomeScreen";

// stub page so navigate("/services") has somewhere to go
function Services() {
  return <div className="p-6">Services page</div>;
}

export default function App() {
  const [done, setDone] = useState(false);

  return (
    <div className="relative min-h-dvh">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/services" element={<Services />} />
      </Routes>

      {!done && <LandingAnimation onFinish={() => setDone(true)} />}
    </div>
  );
}
