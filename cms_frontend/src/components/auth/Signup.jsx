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
      "http://localhost:5500/user/register",
      payload
    );
    if (!res) {
      console.log("Registration error");
    }
    console.log(res.data);
    alert("Successfully registered. Login now!");
  };
  return (
    <div className="flex flex-col justify-center items-center bg-auth-background h-dvh bg-cover bg-opacity-100 shadow-blue-lg">
      <div className="absolute inset-0 bg-blue-950 bg-opacity-80"></div>

      <form
        className="relative z-10 form bg-opacity-80 px-20 py-6 rounded shadow-2xl flex flex-col justify-center items-center"
        autoComplete="off"
        onSubmit={handleRegister}
      >
        <img src="../src/assets/mck_logo.png" alt="" width={150} height={150} />

        <div className="flex flex-col mb-4">
          <label className="text-white" htmlFor="firstName">
            First Name:
          </label>
          <input
            className="w-96 h-9 rounded m-1 p-2 "
            type="text"
            name="firstname"
            placeholder="e.g. John"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-white" htmlFor="lastName">
            Last Name:
          </label>
          <input
            className="w-96 h-9 rounded m-1 p-2 "
            type="text"
            name="lastname"
            placeholder="e.g. Doe"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-white" htmlFor="username">
            Username:
          </label>
          <input
            className="w-96 h-9 rounded m-1 p-2 "
            type="text"
            name="username"
            placeholder="e.g. jdoe"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-white" htmlFor="role">
            Role:
          </label>
          <input
            className="w-96 h-9 rounded m-1 p-2 "
            type="text"
            name="role"
            placeholder="e.g. Minister"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-white" htmlFor="email">
            Email:
          </label>
          <input
            className="w-96 h-9 rounded m-1 p-2 "
            type="email"
            name="email"
            placeholder="e.g. johndoe@email.com"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-white" htmlFor="password">
            Password:
          </label>
          <input
            className="w-96 h-9 rounded m-1 p-2 "
            type="password"
            name="password"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-white" htmlFor="password">
            Confirm Password:
          </label>
          <input
            className="w-96 h-9 rounded m-1 p-2 "
            type="password"
            name="password"
          />
        </div>
        <input
          className="text-white w-48 h-10 bg-sky-700 rounded m-1 mt-4 hover:bg-sky-900"
          type="submit"
          name="submit"
          value="Register"
        />
        <p className="relative z-10 text-gray-400 mt-4">
          Already have an account?{" "}
          <a href="" className="text-sky-700 hover:text-sky-900">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
