import axios from "axios";
import './fetchMember.css';
import React, { useState, useEffect } from "react";
import DeleteMember from "../deleteMember/DeleteMember";

function FetchMember() {
  const [memberID, setmemberID] = useState('');
  const handleSubmit =  (e) => {
      e.preventDefault();
      const memberId = e.target.memberId.value;
      setmemberID(memberId)
  }
  // console.log(`Member Id is: ${memberID}`);
  
  const [member, setMember] = useState([]);
  useEffect(() => {
    const getMember = async () => {
      const res = await axios.post('http://localhost:5500/member/find', {memberId : memberID});
      setMember(res.data);
    }
    getMember()
  },[memberID]);

  
  ////////////////////////////////////////////////////////////////////////////////////////
  // Delete a member
  let mId = '';
  if(member.length > 0){
    mId= member[0]._id;
  }else{
    console.log("No member found!");
  }
  console.log(`mId is ${mId}`);

  /*
  DELETE A MEMBER
  - From the get a member page
  - Add a delete icon at the end
  - When the delete icon is clicked,
  - It should be linked to the Delete component
  - in the delete component, it should receive the _id as a prop from find a user
  - this should be sent to the delete API route as a post request and delete the member
  */
  ////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="all-members">
      <h2>Member Record</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="memberId">Member ID</label>
        <input type="text" placeholder="Example: 20240001" name="memberId"/>

        <button type="submit">Search</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Member ID</th>
            <th>First Name</th>
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
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            member.map((member, index) => (
              <tr key={index}>
                <td>{member.memberId}</td>
                <td>{member.firstName}</td>
                <td>{member.lastName}</td>
                <td>{member.gender}</td>
                <td>{member.dob}</td>
                <td>{member.age}</td>
                <td>{member.email}</td>
                <td>{member.phoneNumber}</td>
                <td>{member.physicalAddress}</td>
                <td>{member.idNo}</td>
                <td>{member.occupation}</td>
                <td>{member.fatherName}</td>
                <td>{member.motherName}</td>
                <td>{member.fatherPhone}</td>
                <td>{member.motherPhone}</td>
                <td>{member.maritalStatus}</td>
                <td>{member.marriageType}</td>
                <td>{member.spouseName}</td>
                <td>{member.spousePhone}</td>
                <td>{member.savedStatus}</td>
                <td>{member.baptisedStatus}</td>
                <td>{member.otherChurchMembership}</td>
                <td>{member.memberType}</td>
                <td>{member.churchCellGroup}</td>
                <td>{member.ministry}</td>
                <td>{member.fellowship}</td>
                <td>{member.isActive}</td>
                <td>{member.regDate}</td>
                <td>{member.notes}</td>
                <td>{<DeleteMember id = {mId} />}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
   
    </div>
  );
}

export default FetchMember;
