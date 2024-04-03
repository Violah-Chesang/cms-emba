import axios from 'axios';
import React from 'react';

function DeleteMember(props) {
    //accepts id as props from parent(FetchMember)component
    const id = props.id;

    // function to run when delete icon is clicked
    const handleDelete = async() => {
        
        // uses object id to search for a member
        const res = await axios.post('http://localhost:5500/member/delete',{id});
        const data = res.data;
        alert(`Member deleted successfully! Deleted:${data.deleted}!!`);
    }

  return (
    <>
        <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>
    </>
  )
}

export default DeleteMember;