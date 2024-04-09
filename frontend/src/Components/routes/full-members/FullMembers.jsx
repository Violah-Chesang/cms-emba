import React, { useState, useEffect } from "react";
import axios from "axios";

function FullMember() {
  const [fullMember, setFullMember] = useState([]);

  useEffect(() => {
    const getFullMember = async () => {
      try{
        const res = await axios.get("http://localhost:5500/reports/full-members");
        setFullMember(res.data);
      }catch(err){
        console.error("Error retrieving the Full member's report", err);
      }
    };
    getFullMember();
  },[]);
  console.log(fullMember);
  
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
          {fullMember.map((fullMember, index) => (
            <tr key={index}>
              <td>{fullMember.memberId}</td>
              <td>{fullMember.firstName}</td>
              <td>{fullMember.middleName}</td>
              <td>{fullMember.surName}</td>
              <td>{fullMember.gender}</td>
              <td>{fullMember.dob}</td>
              <td>{fullMember.age}</td>
              <td>{fullMember.email}</td>
              <td>{fullMember.phone}</td>
              <td>{fullMember.physicalAddress}</td>
              <td>{fullMember.nationalId}</td>
              <td>{fullMember.occupation}</td>
              <td>{fullMember.fatherName}</td>
              <td>{fullMember.motherName}</td>
              <td>{fullMember.fatherPhone}</td>
              <td>{fullMember.motherPhone}</td>
              <td>{fullMember.maritalStatus}</td>
              <td>{fullMember.marriageType}</td>
              <td>{fullMember.spouseName}</td>
              <td>{fullMember.spousePhone}</td>
              <td>{fullMember.savedStatus}</td>
              <td>{fullMember.baptisedStatus}</td>
              <td>{fullMember.otherChurchmanship}</td>
              <td>{fullMember.manType}</td>
              <td>{fullMember.churchCellGroup}</td>
              <td>{fullMember.ministry}</td>
              <td>{fullMember.fellowship}</td>
              <td>{fullMember.isActive}</td>
              <td>{fullMember.regDate}</td>
              <td>{fullMember.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default FullMember;
