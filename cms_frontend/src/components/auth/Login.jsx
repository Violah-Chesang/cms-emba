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
      const res = await axios.post("http://localhost:8000/user/login", data);
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
    <div className="flex flex-col justify-center items-center">
      <form className="form" autoComplete="off" onSubmit={handleSubmit}>
        <label className="text-gray-400" htmlFor="username">
          Username:
        </label>
        <br />
        <input className="w-72 h-8 rounded m-1" name="username" type="text" />
        <br />
        <br />
        <label className="text-gray-400" htmlFor="password">
          Password:
        </label>
        <br />
        <input
          className="w-72 h-8 rounded m-1"
          name="password"
          type="password"
        />{" "}
        <br />
        <br />
        <input
          className="text-white w-48 h-10 bg-sky-700 rounded m-1"
          type="submit"
          name="submit"
        />
        <br />
        <br />
      </form>

      <p className="text-gray-400">Don't have an account? Contact the admin</p>
    </div>
  );
};

export default Login;
