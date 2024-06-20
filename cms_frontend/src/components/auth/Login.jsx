import React from "react";

const Login = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    let data = {
      userName: username,
      password: password,
    };
    try {
      const res = await axios.post("http://localhost:5500/user/login", data);
      if (!res) {
        console.log("Error logging the user in!", console.error);
      }
      console.log(res.data);
      alert("Succesfully logged in. Dashboard coming soon...!");
    } catch (err) {
      console.error("Error:", err);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center bg-auth-background h-dvh bg-cover bg-opacity-100 shadow-blue-lg">
      <div className="absolute inset-0 bg-blue-950 bg-opacity-80"></div>

      <form
        className="relative z-10 form bg-opacity-80 px-16 py-6 rounded shadow-2xl flex flex-col justify-center items-center"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <img src="../src/assets/mck_logo.png" alt="" width={150} height={150} />
        <div className="flex flex-col mb-1">
          <label className="text-white" htmlFor="username">
            Username:
          </label>
          <input
            className="w-96 h-9 rounded m-1 p-2 text-gray-700"
            name="username"
            type="text"
          />
        </div>
        <div className="flex flex-col mb-1">
          <label className="text-white mt-4" htmlFor="password">
            Password:
          </label>
          <input
            className="w-96 h-9 rounded m-1 p-2 text-gray-700"
            name="password"
            type="password"
          />
        </div>
        <input
          className="text-white w-48 h-10 bg-sky-700 rounded m-1 mt-4 hover:bg-sky-900"
          type="submit"
          name="submit"
          value="Login"
        />
        <p className="relative z-10 text-gray-400 mt-4">
          Don't have an account? <a href="" className="text-sky-700 hover:text-sky-900">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
