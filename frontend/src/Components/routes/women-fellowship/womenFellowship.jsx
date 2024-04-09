import React, { useState, useEffect } from "react";
import axios from "axios";

function WomenFellowship() {
  const [womenFellowship, setWomenFellowship] = useState([]);

  useEffect(() => {
    const getWomenFellowship = async () => {
      try{
        const res = await axios.get("http://localhost:5500/reports/women-fellowship");
        setWomenFellowship(res.data);
      }catch(err){
        console.error("Error retriving women fellowship report", err);
      }
    };
    getWomenFellowship();
  },[]);
  console.log(womenFellowship);
  
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Member ID</th>
            <th>First Name</th>
            <th>middle Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Date Of Birth</th>
            <th>Age</th>
            <th>Email Address</th>
            <th>Phone Number</th>
            <th>Physical Address</th>
            <th>National ID No.</th>
            <th>Occupation</th>
            <th>Father's Name</th>
            <th>Mother's Name</th>
            <th>Father's Phone No.</th>
            <th>Mother's Phone No.</th>
            <th>Marital Status</th>
            <th>Marriage type</th>
            <th>Spouse Name</th>
            <th>Spouse's Phone No.</th>
            <th>Born Again</th>
            <th>Baptised</th>
            <th>Another Church Membership</th>
            <th>Member Type</th>
            <th>Cell Group</th>
            <th>Ministry</th>
            <th>Fellowship</th>
            <th>Active</th>
            <th>Registration Date</th>
            <th>Minister's Note</th>
          </tr>
        </thead>
        <tbody>
          {womenFellowship.map((woman, index) => (
            <tr key={index}>
              <td>{woman.memberId}</td>
              <td>{woman.firstName}</td>
              <td>{woman.middleName}</td>
              <td>{woman.surName}</td>
              <td>{woman.gender}</td>
              <td>{woman.dob}</td>
              <td>{woman.age}</td>
              <td>{woman.email}</td>
              <td>{woman.phone}</td>
              <td>{woman.physicalAddress}</td>
              <td>{woman.nationalId}</td>
              <td>{woman.occupation}</td>
              <td>{woman.fatherName}</td>
              <td>{woman.motherName}</td>
              <td>{woman.fatherPhone}</td>
              <td>{woman.motherPhone}</td>
              <td>{woman.maritalStatus}</td>
              <td>{woman.marriageType}</td>
              <td>{woman.spouseName}</td>
              <td>{woman.spousePhone}</td>
              <td>{woman.savedStatus}</td>
              <td>{woman.baptisedStatus}</td>
              <td>{woman.otherChurchmanship}</td>
              <td>{woman.manType}</td>
              <td>{woman.churchCellGroup}</td>
              <td>{woman.ministry}</td>
              <td>{woman.fellowship}</td>
              <td>{woman.isActive}</td>
              <td>{woman.regDate}</td>
              <td>{woman.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default WomenFellowship;
