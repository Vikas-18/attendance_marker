import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import axios from "axios";
import "./css/table.css";

const Record = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Make an API call to fetch results data
    axios
      .get("http://localhost:5000/getResults")
      .then((response) => {
        setResults(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching results:", error);
      });
  }, []); // Empty dependency array ensures the request is made only once

  return (
    <Table className="complain-table">
      <Thead>
        <Tr>
          <Th>Roll Number</Th>

          <Th>Number Of Presents</Th>
        </Tr>
      </Thead>
      <Tbody>
        {results.map((result) => (
          <Tr key={result._id}>
            <Td>{result.rollNumber}</Td>

            <Td>{result.attendanceCount}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Record;
