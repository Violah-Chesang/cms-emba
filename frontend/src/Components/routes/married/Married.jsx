import React, { useState, useEffect } from "react";
import axios from "axios";

function Married() {
  const [married, setMarried] = useState([]);

  useEffect(() => {
    const getMarried = async () => {
      try{
        const res = await axios.get("http://localhost:5500/reports/married");
        setMarried(res.data);
      }catch(err){
        console.error("Error retriving the youth report", err);
      }
    };
    getMarried();
  },[]);
  console.log(married);
  
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
          {married.map((aMarried, index) => (
            <tr key={index}>
              <td>{aMarried.memberId}</td>
              <td>{aMarried.firstName}</td>
              <td>{aMarried.middleName}</td>
              <td>{aMarried.surName}</td>
              <td>{aMarried.gender}</td>
              <td>{aMarried.dob}</td>
              <td>{aMarried.age}</td>
              <td>{aMarried.email}</td>
              <td>{aMarried.phone}</td>
              <td>{aMarried.physicalAddress}</td>
              <td>{aMarried.nationalId}</td>
              <td>{aMarried.occupation}</td>
              <td>{aMarried.fatherName}</td>
              <td>{aMarried.motherName}</td>
              <td>{aMarried.fatherPhone}</td>
              <td>{aMarried.motherPhone}</td>
              <td>{aMarried.maritalStatus}</td>
              <td>{aMarried.marriageType}</td>
              <td>{aMarried.spouseName}</td>
              <td>{aMarried.spousePhone}</td>
              <td>{aMarried.savedStatus}</td>
              <td>{aMarried.baptisedStatus}</td>
              <td>{aMarried.otherChurchmanship}</td>
              <td>{aMarried.manType}</td>
              <td>{aMarried.churchCellGroup}</td>
              <td>{aMarried.ministry}</td>
              <td>{aMarried.fellowship}</td>
              <td>{aMarried.isActive}</td>
              <td>{aMarried.regDate}</td>
              <td>{aMarried.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Married;
