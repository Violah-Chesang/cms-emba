import React from 'react';

interface UserDetails {
  _id: string;
  userName: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

const UserModal: React.FC<{ userDetails: UserDetails | null }> = ({ userDetails }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleModal}
        className="px-4 py-3 bg-[#C8D0FE] rounded-3xl text-lg font-bold"
      >
        {userDetails ? `${userDetails.firstname.charAt(0)}${userDetails.lastname.charAt(0)}` : ""}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 w-80">
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">MY PROFILE</h3>
            {/* <p><strong>ID:</strong> {userDetails?._id}</p>
            <p><strong>Username:</strong> {userDetails?.userName}</p>
            <p><strong>Name:</strong> {userDetails?.firstname} {userDetails?.lastname}</p>
            <p><strong>Email:</strong> {userDetails?.email}</p>
            <p><strong>Role:</strong> {userDetails?.role}</p>
            <p><strong>Created At:</strong> {userDetails?.createdAt}</p>
            <p><strong>Updated At:</strong> {userDetails?.updatedAt}</p> */}

            <div className='w-16 justify-center items-center'>
              <p
                className="px-4 py-4  bg-[#C8D0FE] rounded-3xl text-lg font-bold"
              >
                {userDetails ? `${userDetails.firstname.charAt(0)}${userDetails.lastname.charAt(0)}` : ""}
              </p>

            </div>
          </div>
          <button
            onClick={toggleModal}
            className="block w-full text-center py-2 bg-blue-500 text-white rounded-b-lg"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default UserModal;
