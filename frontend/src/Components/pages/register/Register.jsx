import React from 'react';
import axios from 'axios';
import Particle from '../../particles/Particle';
import './register.css'

function Register() {
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
      userName : username,
      role: role,
      email : email,
      password : password
    }

    const res= await axios.post('http://localhost:5500/user/register',payload);
    if(!res){
      console.log("Registration error");
    }
    console.log(res.data);
    res.data && window.location.replace("/login");
  }
  return (
    <>
      < Particle />
      <div className='register'>        
          <h1>Register</h1>        
            <form className='signup-form' autoComplete='off' onSubmit={handleRegister}>
              <label className='reg-label' htmlFor='firstName'>First Name:</label><br/>
              <input type='text' name='firstname' placeholder='E.g. John'/><br/>

              <label className='reg-label'  htmlFor='lastName'>Last Name:</label><br/>
              <input type='text' name='lastname' placeholder='E.g. Doe'/><br/>

              <label className='reg-label'  htmlFor='username'>Username:</label><br/>
              <input type='text' name='username' placeholder='E.g. jdoe'/><br/>

              <label className='reg-label'  htmlFor='role'>Role:</label><br/>
              <input type='text' name='role' placeholder='E.g. Minister'/><br/>

              <label className='reg-label'  htmlFor='email'>Email:</label><br/>
              <input type='email' name='email' placeholder='E.g. johndoe@email.com'/><br/>

              <label className='reg-label'  htmlFor='password'>Password:</label><br/>
              <input type='password' name='password' /><br/>

              <input type='submit' name='submit' className='form-submit'/><br/>

            </form>
            <p>Already have an account? Login</p>
          
        
      </div>
    </>
  );
}

export default Register;
