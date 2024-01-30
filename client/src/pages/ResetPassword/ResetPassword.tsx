import React, { useState, useEffect } from 'react';
import './ResetPassword.css';
import { useNavigate, useSearchParams } from 'react-router-dom';



const ResetPassword: React.FC = () => {
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    let [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
  useEffect(() => {
    let token = searchParams.get('token')
    let userId = searchParams.get('userId')
    if(token == null || userId == null){
        navigate('/login')
    }
        
    
  }, [])



//When the login button is pressed an api call sends the username and password input by user to be authenticated. 
  const handleSubmit = (e: React.FormEvent) => {
    
  };


    

  return (
    <section>
      <div className="form-box">
        <div className="form-value">
          <form onSubmit={handleSubmit}>
            <h2>Reset Password</h2>
            <div className="inputbox">
              <input type="password" required value={password1} onChange={(e) => setPassword1(e.target.value)} />
              <label>Password</label>
            </div>
            <div className="inputbox">
              <input type="password" required value={password2} onChange={(e) => setPassword2(e.target.value)} />
              <label>Re-type Password</label>
            </div>
            <button type="submit" >Save</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
