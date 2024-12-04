import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/SignUp";
import Navbar from "./Components/Navbar";
import Dashboard from "./Pages/Dashboard";
import Devices from "./Pages/Devices";
import Settings from "./Pages/Settings";
import AboutUs from "./Pages/AboutUs";
import { UserProvider } from "./Context/UserContext";
import { WebSocketProvider } from './Context/WebSocketContext';
import SplashScreen from "./Components/SplashScreen";

function AppContent({ triggerSplashScreen }) {
  const location = useLocation();
  const noNavbarRoutes = ["/login", "/signup","/"]; // Routes where Navbar is not shown

  return (
    <div className="dashboard fade-in">
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Login triggerSplashScreen={triggerSplashScreen} />} />
        <Route path="/login" element={<Login triggerSplashScreen={triggerSplashScreen} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

function App() {
  const [isSplashVisible, setSplashVisible] = useState(() => {
    // Always show splash screen on initial load or reload
    return true;
  });

  const handleSplashEnd = () => {
    setSplashVisible(false);
  };

  const triggerSplashScreen = () => {
    setSplashVisible(true);
  };

  // Add event listener to handle page reload
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem('shouldShowSplash', 'true');
    };

    const checkSplashVisibility = () => {
      const shouldShow = localStorage.getItem('shouldShowSplash') === 'true';
      if (shouldShow) {
        setSplashVisible(true);
        localStorage.removeItem('shouldShowSplash');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    checkSplashVisibility();

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <UserProvider>
      <WebSocketProvider>
        <Router>
          {isSplashVisible ? (
            <SplashScreen onSplashEnd={handleSplashEnd} />
          ) : (
            <AppContent triggerSplashScreen={triggerSplashScreen} />
          )}
        </Router>
      </WebSocketProvider>
    </UserProvider>
  );
}

export default App;


