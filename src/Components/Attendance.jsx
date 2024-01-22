import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Attendance = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [isAccessAllowed, setIsAccessAllowed] = useState(false);

  useEffect(() => {
    // Fetch teacher authentication status from the server
    fetch("http://localhost:5000/teacherAuthenticationStatus")
      .then((response) => response.json())
      .then((data) => {
        setIsAccessAllowed(data.success);
      })
      .catch((error) => {
        console.error("Error fetching teacher authentication status:", error);
      });
  }, []);

  const getUserLocation = () => {
    if (!isAccessAllowed) {
      showToast("Teacher has not allowed attendance marking yet.", "error");
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log(latitude);
          console.log(longitude);

          // Send the location and roll number to the API
          sendLocationToAPI(latitude, longitude);
        },
        (error) => {
          console.error("Error getting user location:", error);
          showToast("Error getting user location. Please try again.", "error");
        }
      );
    } else {
      showToast("Geolocation is not supported by this browser", "error");
    }
  };

  const sendLocationToAPI = (latitude, longitude) => {
    const apiEndpoint = "http://localhost:5000/markAttendance";

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
        console.log("API response:", data);

        if (data.success) {
          showToast("Attendance marked successfully", "success");
        } else {
          showToast(`User does not exist: ${data.message}`, "error");
        }
      })
      .catch((error) => {
        console.error("Error sending location to API:", error);
        showToast("Error sending location data. Please try again.", "error");
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
    <div>
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
        <button type="submit">Mark Attendance</button>
      </form>
    </div>
  );
};

export default Attendance;