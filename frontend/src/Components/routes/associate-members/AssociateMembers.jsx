import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "../../pages/dashboard/Dashboard";

function AssociateMembers() {
  const [associateMembers, setAssociateMembers] = useState([]);
  const [associateCount, setAssociateCount] = useState([]);

  useEffect(() => {
    const getAssociateMembers = async () => {
      try{
        const res = await axios.get("http://localhost:5500/reports/associate-members");
        setAssociateMembers(res.data.assoMembers);
        setAssociateCount(res.data.assoCount)
      }catch(err){
        console.error("Error retrieving the associate member's report", err);
      }
    };
    getAssociateMembers();
  },[]);
  console.log(associateMembers);
  
  return (
    <>
      <Dashboard assoMembersCount = {associateCount} />
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
          {associateMembers.map((associateMembers, index) => (
            <tr key={index}>
              <td>{associateMembers.memberId}</td>
              <td>{associateMembers.firstName}</td>
              <td>{associateMembers.middleName}</td>
              <td>{associateMembers.surName}</td>
              <td>{associateMembers.gender}</td>
              <td>{associateMembers.dob}</td>
              <td>{associateMembers.age}</td>
              <td>{associateMembers.email}</td>
              <td>{associateMembers.phone}</td>
              <td>{associateMembers.physicalAddress}</td>
              <td>{associateMembers.nationalId}</td>
              <td>{associateMembers.occupation}</td>
              <td>{associateMembers.fatherName}</td>
              <td>{associateMembers.motherName}</td>
              <td>{associateMembers.fatherPhone}</td>
              <td>{associateMembers.motherPhone}</td>
              <td>{associateMembers.maritalStatus}</td>
              <td>{associateMembers.marriageType}</td>
              <td>{associateMembers.spouseName}</td>
              <td>{associateMembers.spousePhone}</td>
              <td>{associateMembers.savedStatus}</td>
              <td>{associateMembers.baptisedStatus}</td>
              <td>{associateMembers.otherChurchmanship}</td>
              <td>{associateMembers.manType}</td>
              <td>{associateMembers.churchCellGroup}</td>
              <td>{associateMembers.ministry}</td>
              <td>{associateMembers.fellowship}</td>
              <td>{associateMembers.isActive}</td>
              <td>{associateMembers.regDate}</td>
              <td>{associateMembers.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default AssociateMembers;
