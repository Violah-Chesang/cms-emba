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
    <div className="search-member">
      <h2>Search Member</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="memberId" className="fetch-member-label">Member ID</label> <br />
        <div className="form-input">
          <input type="text" placeholder="Example: 20240001" name="memberId"/>
          <button type="submit">Search</button>
        </div>

        
      </form>
      <table>
        <tbody>
          {
            member.map((member) => (
              <div className="member-table">
                <h2>Details for {member.firstName} {member.middleName}</h2>
                <tr>
                  <th className="field">Member ID</th>
                  <td className="value">{member.memberId}</td>
                </tr>
                <tr>
                  <th className="field">First Name</th>
                  <td className="value">{member.firstName}</td>
                </tr>

                <tr>
                  <th className="field">Middle Name</th>
                  <td className="value">{member.middleName}</td>
                </tr>
                
                <tr>
                  <th className="field">Last Name</th>
                  <td className="value">{member.surName}</td>
                </tr>
                

                  <tr>
                    <th className="field">Gender</th>
                    <td className="value">{member.gender}</td>
                  </tr>
  
                  <tr>
                    <th className="field">Date Of Birth</th>
                    <td className="value">{member.dob}</td>
                  </tr>

                  <tr>
                    <th className="field">Age</th>
                    <td className="value">{member.age}</td>
                  </tr>                  

                  <tr>
                    <th className="field">Email</th>
                    <td className="value">{member.email}</td>
                  </tr>

                  <tr>
                    <th className="field">Phone Number</th>
                    <td className="value">{member.phoneNumber}</td>
                  </tr>

                  <tr>
                    <th className="field">physical Address</th>
                    <td className="value">{member.physicalAddress}</td>
                    </tr>

                  <tr>
                    <th className="field">national Id</th>
                    <td className="value">{member.nationalId}</td>
                  </tr>

                  <tr>
                    <th className="field">Occupation</th>
                    <td className="value">{member.occupation}</td>
                  </tr>

                  <tr>
                    <th className="field">Father's Name</th>
                    <td className="value">{member.fatherName}</td>
                  </tr>

                  <tr>
                    <th className="field">Mother's Name</th>
                    <td className="value">{member.motherName}</td>
                  </tr>

                  <tr>
                    <th className="field">Father's Phone Number</th>
                    <td className="value">{member.fatherPhone}</td>
                  </tr>

                  <tr>
                    <th className="field">Mother's Phone Number</th>
                    <td className="value">{member.motherPhone}</td>
                  </tr>

                  <tr>
                    <th className="field">Marital Status</th>
                    <td className="value">{member.maritalStatus}</td>
                  </tr>

                  <tr>
                    <th className="field">Marriage Type</th>
                    <td className="value">{member.marriageType}</td>
                  </tr>

                  <tr>
                    <th className="field">Spouse Name</th>
                    <td className="value">{member.spouseName}</td>
                  </tr>

                  <tr>
                    <th className="field">Spouse Phone Number</th>
                    <td className="value">{member.spousePhone}</td>
                  </tr>
                  
                  <tr>
                    <th className="field">Saved</th>
                    <td className="value">{member.savedStatus}</td>
                  </tr>

                  <tr>
                    <th className="field">Baptised</th>
                    <td className="value">{member.baptisedStatus}</td>
                  </tr>

                  <tr>
                    <th className="field">Member of other Church</th>
                    <td className="value">{member.otherChurchMembership}</td>
                  </tr>

                  <tr>
                    <th className="field">Member Type</th>
                    <td className="value">{member.memberType}</td>
                  </tr>

                  <tr>
                    <th className="field">Cell Group</th>
                    <td className="value">{member.churchCellGroup}</td>
                  </tr>

                  <tr>
                    <th className="field">Ministry</th>
                    <td className="value">{member.ministry}</td>
                  </tr>

                  <tr>
                    <th className="field">Fellowship</th>
                    <td className="value">{member.fellowship}</td>
                  </tr>

                  <tr>
                    <th className="field">Active status</th>
                    <td className="value">{member.isActive}</td>
                  </tr>

                  <tr>
                    <th className="field">Registration Date</th>
                    <td className="value">{member.regDate}</td>
                  </tr>

                  <tr>
                    <th className="field">Reverend's Comment</th>
                    <td className="value">{member.notes}</td>
                  </tr>

                  <tr>
                    <th className="field">Delete</th>
                    <td className="value">{<DeleteMember id = {mId} />}</td>
                  </tr>
              </div>
            ))
          }
        </tbody>
      </table>
   
    </div>
  );
}

export default FetchMember;
