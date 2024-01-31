import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ForgetPass.css';
import { CreateOrgAPI } from '../../api/CreateOrgAPI';


const ForgetPass: React.FC = () => {
  //Didn't know what you might need, so left them commented out
  //Basic page that prompts user to enter email and then 
  //routes them to login. Can be changed when we know where we 
  //want to send the user and if more pages need to be created.

  //const [username, setUsername] = useState('');
  //const [password, setPassword] = useState('');
  //const [organization, setOrgname] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    //CreateOrgAPI.createOrg(username, password, email, organization)
    //.then(response => {
    //  console.log("here")
    //  console.log(response)
    //})    
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