import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css/teacher.css";

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

        // Update the authentication status only if allowed
        if (result.isAllowed) {
          setAuthenticated(true);
        } else {
          // If not allowed, show a toast and set authenticated to false
          toast.error("Teacher is not allowed to access attendance");
          setAuthenticated(false);
        }
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
    <div className="teacher">
      <ToastContainer />
      <h2>Teacher</h2>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleAuthentication} class="button-82-pushable">
          <span class="button-82-shadow"></span>
          <span class="button-82-edge"></span>
          <span class="button-82-front text">Allow Access</span>
        </button>
      </div>
      {authenticated && (
        <div>
          {/* Render the logout button only if authenticated */}
          <button onClick={handleLogout} class="button-24">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Teacher;
