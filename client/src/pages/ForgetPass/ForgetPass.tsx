import React, {  useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ForgetPass.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { AuthAPI } from '../../api/AuthAPI';

const ForgetPass: React.FC = () => {
  //Basic page that prompts user to enter email and then 
  //routes them to login.

  const [email, setEmail] = useState('');
  const navigate = useNavigate();



  const handleSubmit = () => {  
    AuthAPI.requestPasswordReset(email).then(response => {
      console.log(response)
    }).catch(error => console.log(error))
    navigate("/login")
  };
    

  return (
    <section>
      <div className="forgetform-box ">
        <div className='link'><Link to={'/login'}><ArrowLeftOutlined style={{color:'white'}}/></Link></div>
        <div className="form-value">
          <form onSubmit={handleSubmit}>
            <h2 style={{fontFamily: 'Oswald'}} >Forgot Password?</h2>
            <div className="inputbox">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              <label>Enter your email</label>
            </div>
            <button type="submit" className='forget-pass-button'>Submit</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgetPass;