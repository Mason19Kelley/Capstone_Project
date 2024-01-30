import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ForgetPass.css';
import { CreateOrgAPI } from '../../api/CreateOrgAPI';


const ForgetPass: React.FC = () => {
  //Basic page that prompts user to enter email and then 
  //routes them to login.

  const [email, setEmail] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    
  }, [])

  const handleSubmit = (e: React.FormEvent) => {  
    navigate("/login")
  };
    

  return (
    <section>
      <div className="forgetform-box">
        <div className="form-value">
          <form onSubmit={handleSubmit}>
            <h2>Forgot Password?</h2>
            <div className="inputbox">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              <label>Enter your email</label>
            </div>
            <button type="submit" >Next</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgetPass;