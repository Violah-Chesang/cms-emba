import React, { useState, useEffect } from "react";
import axios from "axios";

function Youth({updateMyfCount}) {
  const [youth, setYouth] = useState([]);

  useEffect(() => {
    const getYouth = async () => {
      try{
        const res = await axios.get("http://localhost:5500/reports/youth-fellowship");
        setYouth(res.data);
        updateMyfCount(res.data.length);
      }catch(err){
        console.error("Error retriving the youth report", err);
      }
    };
    getYouth();
  },[updateMyfCount]);
  
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
          {youth.map((aYouth, index) => (
            <tr key={index}>
              <td>{aYouth.memberId}</td>
              <td>{aYouth.firstName}</td>
              <td>{aYouth.middleName}</td>
              <td>{aYouth.surName}</td>
              <td>{aYouth.gender}</td>
              <td>{aYouth.dob}</td>
              <td>{aYouth.age}</td>
              <td>{aYouth.email}</td>
              <td>{aYouth.phone}</td>
              <td>{aYouth.physicalAddress}</td>
              <td>{aYouth.nationalId}</td>
              <td>{aYouth.occupation}</td>
              <td>{aYouth.fatherName}</td>
              <td>{aYouth.motherName}</td>
              <td>{aYouth.fatherPhone}</td>
              <td>{aYouth.motherPhone}</td>
              <td>{aYouth.maritalStatus}</td>
              <td>{aYouth.marriageType}</td>
              <td>{aYouth.spouseName}</td>
              <td>{aYouth.spousePhone}</td>
              <td>{aYouth.savedStatus}</td>
              <td>{aYouth.baptisedStatus}</td>
              <td>{aYouth.otherChurchmanship}</td>
              <td>{aYouth.manType}</td>
              <td>{aYouth.churchCellGroup}</td>
              <td>{aYouth.ministry}</td>
              <td>{aYouth.fellowship}</td>
              <td>{aYouth.isActive}</td>
              <td>{aYouth.regDate}</td>
              <td>{aYouth.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Youth;
