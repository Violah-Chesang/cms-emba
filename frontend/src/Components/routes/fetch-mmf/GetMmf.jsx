import React, { useState, useEffect } from "react";
import axios from "axios";

function GetMmf() {
  const [mmf, setMmf] = useState([]);

  useEffect(() => {
    const getMMF = async () => {
      try{
        const res = await axios.get("http://localhost:5500/reports/men-fellowship");
        setMmf(res.data);
      }catch(err){
        console.error("Error retriving mmf report", err);
      }
    };
    getMMF();
  },[]);
  console.log(mmf);
  
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
          {mmf.map((man, index) => (
            <tr key={index}>
              <td>{man.memberId}</td>
              <td>{man.firstName}</td>
              <td>{man.middleName}</td>
              <td>{man.surName}</td>
              <td>{man.gender}</td>
              <td>{man.dob}</td>
              <td>{man.age}</td>
              <td>{man.email}</td>
              <td>{man.phone}</td>
              <td>{man.physicalAddress}</td>
              <td>{man.nationalId}</td>
              <td>{man.occupation}</td>
              <td>{man.fatherName}</td>
              <td>{man.motherName}</td>
              <td>{man.fatherPhone}</td>
              <td>{man.motherPhone}</td>
              <td>{man.maritalStatus}</td>
              <td>{man.marriageType}</td>
              <td>{man.spouseName}</td>
              <td>{man.spousePhone}</td>
              <td>{man.savedStatus}</td>
              <td>{man.baptisedStatus}</td>
              <td>{man.otherChurchmanship}</td>
              <td>{man.manType}</td>
              <td>{man.churchCellGroup}</td>
              <td>{man.ministry}</td>
              <td>{man.fellowship}</td>
              <td>{man.isActive}</td>
              <td>{man.regDate}</td>
              <td>{man.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default GetMmf;
