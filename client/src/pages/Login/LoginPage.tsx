import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { AuthAPI } from '../../api/AuthAPI';
import { AuthContext } from '../../context/AuthContext';
import { User } from '../../models/user.model'
import { api } from '../../api/axiosConfig';
import Cookies from 'js-cookie';

interface LoginResponse {
  token: string,
  user: User; 
}

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isLoggedIn, setLoggedIn, setUser } = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const token = Cookies.get("token");
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
    AuthAPI.checkUser().then(response => {
      console.log(response)
      setUser(response)
      setLoggedIn(true)
      navigate("/home")
    }).catch(error => 
      console.log(error)
    )
  }, [])




  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    AuthAPI.login(username, password)
      .then((response: LoginResponse) => {
        setLoggedIn(true)
        setUser(response.user)
        navigate("/home")
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          console.log("incorrect password");
        } else if (error.response && error.response.status === 500) {
          console.log("user not found");
        }
      });
  };
    

  return (
    <section>
      <div className="form-box">
        <div className="form-value">
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="inputbox">
              <input type="username" required value={username} onChange={(e) => setUsername(e.target.value)} />
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
