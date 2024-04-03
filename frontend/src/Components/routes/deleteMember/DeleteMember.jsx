import axios from 'axios';
import React from 'react';

function DeleteMember(props) {
    const id = props.id;
    console.log(`Delete member id ${id}`);
    const handleDelete = async() => {
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