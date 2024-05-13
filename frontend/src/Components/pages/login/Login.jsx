import React from 'react';
import flower from "../../../images/flower.jpg"
import './login.css';
import axios from 'axios';
import Particle from '../../particles/Particle';

function Login() {
    const handleSubmit =async (event) => {
        event.preventDefault();
    
        const username = event.target.username.value;
        const password = event.target.password.value;
    
        let data = {
          userName : username,
          password : password
        }
        try{  
          const res = await axios.post('http://localhost:8000/user/login', data);
          if(!res){
            console.log("Error logging the user in!", console.error);
          }      
          console.log(res.data);
          alert("Succesfully logged in. Dashboard coming soon...!")
        
        }catch(err){
          console.error('Error:', err);

        }
    }
    return (
      <>
      <Particle />
        <div className='login'>
                <div className='login'>
                <h1>Login</h1>
                <div className='cover'>
                    <div className='flower-col'>
                    <img src={flower} alt='flower' />
                    </div>

                    <div className='form-col'>
                      <form className='form' autoComplete='off' onSubmit={handleSubmit}>
                          <label htmlFor='username'>Username:</label><br/>
                          <input name='username' type='text'/> <br/>

                          <label htmlFor='password'>Password:</label><br/>
                          <input name='password' type='password'/> <br/>

                          <input type='submit' name='submit' className='login-submit'/>
                      </form>

                      <p>Don't have an account? Contact the admin</p>
                    </div>
                </div>
                </div>
            
        </div>
      </>
    );
}

export default Login;