import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Teacher = () => {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const handleAuthentication = async () => {
    try {
      const response = await fetch(
        "https://serverattendance.onrender.com/authenticateTeacher",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      const result = await response.json();

      if (result.success) {
        // Teacher authenticated successfully, show success toast
        toast.success("Teacher authenticated successfully");
        // Update the authentication status
        setAuthenticated(true);
      } else {
        // Authentication failed, show error toast
        toast.error(`Authentication failed: ${result.message}`);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      // Show a generic error toast
      toast.error("An error occurred during authentication");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "https://serverattendance.onrender.com/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (result.success) {
        // Teacher logged out successfully, show success toast
        toast.success("Logged out successfully");
        // Update the authentication status
        setAuthenticated(false);
      } else {
        // Logout failed, show error toast
        toast.error(`Logout failed: ${result.message}`);
      }
    } catch (error) {
      console.error("Error during logout:", error);
      // Show a generic error toast
      toast.error("An error occurred during logout");
    }
  };

  return (
    <div>
      <ToastContainer />
      <h2>Teacher</h2>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleAuthentication}>Authenticate</button>
      </div>
      {authenticated && (
        <div>
          {/* Render the logout button only if authenticated */}
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Teacher;
