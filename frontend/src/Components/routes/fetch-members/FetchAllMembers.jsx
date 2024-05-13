import axios from "axios";
import React, { useState, useEffect } from "react";
import './fetchAllMembers.css';

function FetchAllMembers({ updateTotalMembers }) {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const getMembers = async () => {
      try {
        const res = await axios.get("http://localhost:5500/member/find/all");
        setMembers(res.data);
        updateTotalMembers(res.data.length);
      } catch (err) {
        console.error("Error fetching members: ", err);
      }
    };
    getMembers();
  }, [updateTotalMembers]);
  
  return (
    <div className="all-members">
      <h1>All Members</h1>
      <table className="custom-table">
        <thead>
          <tr>
            <th className="header-cell">Index</th> {/* For the auto-incrementing index */}
            <th className="header-cell">Member ID</th>
            <th className="header-cell">First Name</th>
            <th className="header-cell">Middle Name</th>
            <th className="header-cell">Last Name</th>
            <th className="header-cell">Gender</th>
            <th className="header-cell">Date Of Birth</th>
            <th className="header-cell">Age</th>
            <th className="header-cell">Email Address</th>
            <th className="header-cell">Phone Number</th>
            <th className="header-cell">Physical Address</th>
            <th className="header-cell">National ID No.</th>
            <th className="header-cell">Occupation</th>
            <th className="header-cell">Father's Name</th>
            <th className="header-cell">Mother's Name</th>
            <th className="header-cell">Father's Phone No.</th>
            <th className="header-cell">Mother's Phone No.</th>
            <th className="header-cell">Marital Status</th>
            <th className="header-cell">Marriage type</th>
            <th className="header-cell">Spouse Name</th>
            <th className="header-cell">Spouse's Phone No.</th>
            <th className="header-cell">Born Again</th>
            <th className="header-cell">Baptised</th>
            <th className="header-cell">Another Church Membership</th>
            <th className="header-cell">Member Type</th>
            <th className="header-cell">Cell Group</th>
            <th className="header-cell">Ministry</th>
            <th className="header-cell">Fellowship</th>
            <th className="header-cell">Active</th>
            <th className="header-cell">Registration Date</th>
            <th className="header-cell">Minister's Note</th>            
          </tr>
        </thead>
        <tbody>
          {
            members.map((member, index) => (
              <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                <td>{index + 1}</td>
                <td>{member.memberId}</td>
                <td>{member.firstName}</td>
                <td>{member.middleName}</td>
                <td>{member.surName}</td>
                <td>{member.gender}</td>
                <td>{member.dob}</td>
                <td>{member.age}</td>
                <td>{member.email}</td>
                <td>{member.phoneNumber}</td>
                <td>{member.physicalAddress}</td>
                <td>{member.nationalId}</td>
                <td>{member.occupation}</td>
                <td>{member.fatherName}</td>
                <td>{member.motherName}</td>
                <td>{member.fatherPhone}</td>
                <td>{member.motherPhone}</td>
                <td>{member.maritalStatus}</td>
                <td>{member.marriageType}</td>
                <td>{member.spouseName}</td>
                <td>{member.phone}</td>
                <td>{member.savedStatus}</td>
                <td>{member.baptisedStatus}</td>
                <td>{member.otherChurchMembership}</td>
                <td>{member.memberType}</td>
                <td>{member.cellGroup}</td>
                <td>{member.ministry}</td>
                <td>{member.fellowship}</td>
                <td>{member.isActive}</td>
                <td>{member.regDate}</td>
                <td>{member.notes}</td>
              </tr>
            ))
          }
        </tbody>
      </table>

    </div>
  );
}

export default FetchAllMembers;
