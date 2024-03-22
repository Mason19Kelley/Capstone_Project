import React, { useState, useEffect } from 'react';
import './ResetPassword.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthAPI } from '../../api/AuthAPI';



const ResetPassword: React.FC = () => {
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    let [searchParams] = useSearchParams();
    const [userId, setUserId] = useState<string | null>("");
    const [token, setToken] = useState<string | null>("")


    const navigate = useNavigate();
    // if not good reset request, navigate back to login
    useEffect(() => {
      let tokenParam = searchParams.get('token')
      let userIdParam = searchParams.get('userId')
      setToken(tokenParam)
      setUserId(userIdParam)
      if(tokenParam == null || userIdParam == null){
          navigate('/login')
      } 
    }, [])






//When the login button is pressed an api call sends the username and password input by user to be authenticated. 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    AuthAPI.resetPassword(userId, token, password1).then(() => {
      navigate('/login')
    }).catch(error => console.log(error))
  };


  const canSubmit = () => {
    return password1 !== password2 && password1.length > 0
  }


  return (
    <section>
      <div className="form-box">
        <div className="form-value">
          <form onSubmit={(e) => handleSubmit(e)}>
            <h2>Reset Password</h2>
            <div className="inputbox">
              <input type="password" required value={password1} onChange={(e) => setPassword1(e.target.value)} />
              <label>Password</label>
            </div>
            <div className="inputbox">
              <input type="password" required value={password2} onChange={(e) => setPassword2(e.target.value)} />
              <label>Re-type Password</label>
            </div>
            <button type="submit" className="reset-pass-button" disabled={canSubmit()}>Save</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
