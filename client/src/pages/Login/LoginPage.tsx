import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

interface LoginPageProps {
  onLogin: (user: string, password: string) => void;
  authentication: boolean;
}

interface NavConditionalProps {
  auth: boolean;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, authentication }) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  console.log(authentication)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(user, password);
  };

  const NavConditional: React.FC<NavConditionalProps> = ({ auth }) => {
    return auth ? <Link to="/createacct">Login</Link> : <Link to="/createacct">Login</Link>;
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
            <NavConditional auth={authentication}/>
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
