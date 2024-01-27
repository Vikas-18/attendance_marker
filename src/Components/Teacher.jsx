import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css/teacher.css";

const Teacher = () => {
  const [password, setPassword] = useState("");

  const handleAuthentication = async () => {
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
      console.log(
        "https://serverattendance.onrender.com/teacherAuthenticationStatus"
      );
    } else {
      // Authentication failed, show error toast
      toast.error(`Authentication failed: ${result.message}`);
    }
  };

  const handleLogout = async () => {
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
    console.log(
      "https://serverattendance.onrender.com/teacherAuthenticationStatus"
    );
    if (result.success) {
      // Teacher logged out successfully, show success toast
      toast.success("Logged out successfully");
    } else {
      // Logout failed, show error toast
      toast.error(`Logout failed: ${result.message}`);
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
        <button onClick={handleAuthentication} class="button-82-pushable">
          <span class="button-82-shadow"></span>
          <span class="button-82-edge"></span>
          <span class="button-82-front text">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Teacher;
