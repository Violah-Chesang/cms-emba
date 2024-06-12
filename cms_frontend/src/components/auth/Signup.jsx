import React from "react";

const Signup = () => {
  const handleRegister = async (event) => {
    event.preventDefault();

    const firstname = event.target.firstname.value;
    const lastname = event.target.lastname.value;
    const username = event.target.username.value;
    const role = event.target.role.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    let payload = {
      firstname: firstname,
      lastname: lastname,
      userName: username,
      role: role,
      email: email,
      password: password,
    };

    console.log(`First name is ${payload.firstname}`);

    const res = await axios.post(
      "http://localhost:9000/user/register",
      payload
    );
    if (!res) {
      console.log("Registration error");
    }
    console.log(res.data);
    alert("Successfully registered. Login now!");
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <form autoComplete="off" onSubmit={handleRegister}>
        <label className="text-gray-400" htmlFor="firstName">
          First Name:
        </label>
        <br />
        <input
          className="w-72 h-8 rounded m-1"
          type="text"
          name="firstname"
          placeholder="E.g. John"
        />
        <br />
        <br />

        <label className="text-gray-400" htmlFor="lastName">
          Last Name:
        </label>
        <br />
        <input
          className="w-72 h-8 rounded m-1"
          type="text"
          name="lastname"
          placeholder="E.g. Doe"
        />
        <br /><br />

        <label className="text-gray-400" htmlFor="username">
          Username:
        </label>
        <br />
        <input
          className="w-72 h-8 rounded m-1"
          type="text"
          name="username"
          placeholder="E.g. jdoe"
        />
        <br /><br />

        <label className="text-gray-400" htmlFor="role">
          Role:
        </label>
        <br />
        <input
          className="w-72 h-8 rounded m-1"
          type="text"
          name="role"
          placeholder="E.g. Minister"
        />
        <br /><br />

        <label className="text-gray-400" htmlFor="email">
          Email:
        </label>
        <br />
        <input
          className="w-72 h-8 rounded m-1"
          type="email"
          name="email"
          placeholder="E.g. johndoe@email.com"
        />
        <br /><br />

        <label className="text-gray-400" htmlFor="password">
          Password:
        </label>
        <br />
        <input className="w-72 h-8 rounded" type="password" name="password" />
        <br /><br />

        <input
          className="text-white w-48 h-10 bg-sky-700 rounded "
          type="submit"
          name="submit"
        />
        <br /><br />
      </form>
      <p className="text-gray-400">Already have an account? Login</p>
    </div>
  );
};

export default Signup;
