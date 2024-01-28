import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css/attendance.css";

const Attendance = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [isAccessAllowed, setIsAccessAllowed] = useState(false);

  useEffect(() => {
    // Fetch teacher authentication status from the server
    fetch("https://serverattendance.onrender.com/teacherAuthenticationStatus")
      .then((response) => response.json())
      .then((data) => {
        // Check conditions for authentication
        if (data.isAllowed === true) {
          setIsAccessAllowed(true);
        } else {
          setIsAccessAllowed(false);
        }
      });
  }, []);

  const getUserLocation = () => {
    if (isAccessAllowed === false) {
      showToast("Teacher has not allowed attendance marking yet.", "error");
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Send the location, roll number, and date to the API
        sendLocationToAPI(latitude, longitude);
      });
    } else {
      showToast("Geolocation is not supported by this browser", "error");
    }
  };

  const sendLocationToAPI = (latitude, longitude) => {
    const apiEndpoint = "https://serverattendance.onrender.com/markAttendance";

    fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rollNumber,
        latitude,
        longitude,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          showToast("Attendance marked successfully", "success");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          showToast(` ${data.message}`, "error");
        }
      });
  };

  const handleRollNumberChange = (e) => {
    setRollNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getUserLocation();
  };

  const showToast = (message, type) => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <div className="attendance">
      <ToastContainer />
      <h2>Attendance</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Roll Number:
          <input
            type="text"
            value={rollNumber}
            onChange={handleRollNumberChange}
            required
          />
        </label>
        <button className="button-82-pushable">
          <span className="button-82-shadow"></span>
          <span className="button-82-edge"></span>
          <span className="button-82-front text">Mark Attendance</span>
        </button>
      </form>
    </div>
  );
};

export default Attendance;
