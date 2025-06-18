import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import Welcome from "./pages/welcome";
import Navbar from "./components/navbar";
import Dashboard from "./components/dashboard";
import AuthForm from "./pages/authform";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [flag,setflag] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    setflag(true);
  }, []);

  const handleGetstarted = () => {
    setShowWelcome(false);
  };

  if(!flag) return null;
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            showWelcome ? (
              <Welcome onGetstarted={handleGetstarted} />
            ) : isLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />

        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/auth" />}
        />

       <Route path="/auth" element={<AuthForm setIsLoggedIn={setIsLoggedIn} />} />



        {/* fallback for any unknown route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
