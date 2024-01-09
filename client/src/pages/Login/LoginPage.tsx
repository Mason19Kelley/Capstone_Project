import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

interface LoginPageProps {
  onLogin: (user: string, password: string) => Promise<void>;
  authentication: boolean;
}

interface NavConditionalProps {
  auth: boolean;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, authentication }) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onLogin(user, password)
    console.log(authentication)
    if(authentication){
      navigate("/home");
    }
  };

  return (
    <section>
      <div className="form-box">
        <div className="form-value">
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="inputbox">
              <input type="username" required value={user} onChange={(e) => setUser(e.target.value)} />
              <label>Username</label>
            </div>
            <div className="inputbox">
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              <label>Password</label>
            </div>
            <div className="forget">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <label>
                <a href="#">Forgot password?</a>
              </label>
            </div>
            <button type="submit" >Login</button>
            <div className="register">
              <p>
                Don't have an account ? <Link to="/createacct">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
