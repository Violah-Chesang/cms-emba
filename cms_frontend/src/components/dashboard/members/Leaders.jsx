import React, { useState, useEffect } from "react";
import Fellowship from "./Fellowship";

const columns = [
  { header: "ID", accessor: "memberId" },
  { header: "Name", accessor: "name" },
  { header: "Phone Number", accessor: "phone" },
  { header: "Physical Address", accessor: "physicalAddress" },
  { header: "Marital Status", accessor: "maritalStatus" },
  { header: "Baptised", accessor: "baptisedStatus" },
  { header: "Cell Group", accessor: "cellGroup" },
  { header: "Fellowship", accessor: "fellowship" },
  { header: "Status", accessor: "isActive" },
];

function Leaders() {
  const [leaders, setLeaders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "http://localhost:5500/member/find/all"; // Simplified URL creation
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const data = await response.json();
        const leadersData = data.filter(
          (member) => member.ministry === "Leader"
        );
        setLeaders(leadersData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Fellowship title="Leaders" fetchUrl="http://localhost:5500/member/find/all" columns={columns} data={leaders} />
  );
}

export default Leaders;
