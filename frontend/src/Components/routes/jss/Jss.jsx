import React, { useState, useEffect } from "react";
import axios from "axios";

function Jss() {
  const [jss, setJss] = useState([]);

  useEffect(() => {
    const getJss = async () => {
      try{
        const res = await axios.get("http://localhost:5500/reports/jss");
        setJss(res.data);
      }catch(err){
        console.error("Error retriving the JSS report", err);
      }
    };
    getJss();
  },[]);
  console.log(jss);
  
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
          {jss.map((aJss, index) => (
            <tr key={index}>
              <td>{aJss.memberId}</td>
              <td>{aJss.firstName}</td>
              <td>{aJss.middleName}</td>
              <td>{aJss.surName}</td>
              <td>{aJss.gender}</td>
              <td>{aJss.dob}</td>
              <td>{aJss.age}</td>
              <td>{aJss.email}</td>
              <td>{aJss.phone}</td>
              <td>{aJss.physicalAddress}</td>
              <td>{aJss.nationalId}</td>
              <td>{aJss.occupation}</td>
              <td>{aJss.fatherName}</td>
              <td>{aJss.motherName}</td>
              <td>{aJss.fatherPhone}</td>
              <td>{aJss.motherPhone}</td>
              <td>{aJss.maritalStatus}</td>
              <td>{aJss.marriageType}</td>
              <td>{aJss.spouseName}</td>
              <td>{aJss.spousePhone}</td>
              <td>{aJss.savedStatus}</td>
              <td>{aJss.baptisedStatus}</td>
              <td>{aJss.otherChurchmanship}</td>
              <td>{aJss.manType}</td>
              <td>{aJss.churchCellGroup}</td>
              <td>{aJss.ministry}</td>
              <td>{aJss.fellowship}</td>
              <td>{aJss.isActive}</td>
              <td>{aJss.regDate}</td>
              <td>{aJss.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Jss;
